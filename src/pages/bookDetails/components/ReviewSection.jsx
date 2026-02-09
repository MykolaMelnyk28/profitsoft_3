import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import Typography from "components/Typography";
import { useMemo, useCallback, useEffect, useState } from "react";
import Stack from "components/Stack";
import { useIntl } from "react-intl";
import ReviewItem from "./ReviewItem";
import Loading from "components/Loading";
import ShowMorePagination from "app/components/ShowMorePagination";
import TextField from "components/TextField";
import actionsReviews from "app/actions/reviews";
import { useSearchParams } from "react-router-dom";
import reviewActions from "app/actions/reviews";
import Select from "components/Select";
import MenuItem from "components/MenuItem";
import SecuredBox from "app/components/SecuredBox";
import useSecuredCallback from "misc/hooks/useSecuredCallback";

export default function ReviewSection({ bookId }) {
  const PAGE_SIZE = 10;

  const [reviewInput, setReviewInput] = useState("");
  const [ratingValue, setRatingValue] = useState(0);

  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const {
    firstName: userFirstName,
    lastName: userLastName,
  } = useSelector((state) => state.user);

  const { isLoading, reviews } = useSelector((state) => state.reviews);

  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    size: String(PAGE_SIZE),
  });

  useEffect(() => {
    setSearchParams(prev => {
      searchParams.set('page', '0');
      searchParams.set('size', String(PAGE_SIZE));
      return prev;
    });
  }, []);

  const filter = useMemo(() => {
    const getInt = (key) => {
      const value = searchParams.get(key);
      const n = parseInt(value, 10);
      return Number.isInteger(n) ? n : null;
    };

    return {
      bookId: parseInt(bookId),
      page: getInt("page") ?? 0,
      size: getInt("size") ?? PAGE_SIZE,
    };
  }, [searchParams, bookId]);

  useEffect(() => {
    if (filter.bookId) {
      dispatch(actionsReviews.fetchReviewsPage(filter));
    }
  }, [filter, dispatch]);

  const setParams = useCallback(
    (updater) => {
      setSearchParams((prev) => {
        const prevObj = Object.fromEntries(prev);
        const nextObj =
          typeof updater === "function" ? updater(prevObj) : updater;

        const next = new URLSearchParams();
        Object.entries(nextObj).forEach(([key, value]) => {
          if (
            value !== null &&
            value !== undefined &&
            value !== "" &&
            !(Array.isArray(value) && value.length === 0)
          ) {
            next.set(key, value);
          }
        });
        return next;
      });
    },
    [setSearchParams],
  );

  const handleSelectPage = useCallback(
    (page) => {
      setParams((prev) => ({ ...prev, page: page - 1 }));
    },
    [setParams],
  );

  const handleChangePageSize = useCallback(
    (size) => {
      setParams((prev) => ({ ...prev, size, page: 0 }));
    },
    [setParams],
  );

  const onClickShowMore = () => handleChangePageSize(filter.size + PAGE_SIZE);

  const validateReview = () => {
    if (!reviewInput?.trim()) return false;
    if (!ratingValue) return false;
    if (ratingValue < 1 || ratingValue > 5) return false;
    return true;
  };

  const handleCreateReviewButtonClick = useSecuredCallback(async () => {
    const review = {
      bookId,
      author: `${userFirstName} ${userLastName}`,
      rating: ratingValue,
      content: reviewInput,
    };
    if (validateReview(review)) {
      await dispatch(reviewActions.createReview(review));
      dispatch(actionsReviews.fetchReviewsPage(filter));
    }
  });

  const handleRatingChange = (e) => {
    setRatingValue(parseInt(e.target.value));
  };

  return (
    <>
      <Typography variant="subTitle">
        {formatMessage({ id: "page.book.details.reviews.title" })}
      </Typography>
      <SecuredBox>
        <Stack spacing={1}>
          <Select
            value={ratingValue}
            onChange={handleRatingChange}
            size="small"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
          <TextField
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            label={formatMessage({
              id: "page.book.details.reviews.textfield.helperText",
            })}
            size="medium"
          />
          <Button onClick={handleCreateReviewButtonClick}>
            {formatMessage({
              id: "page.book.details.reviews.createButton.title",
            })}
          </Button>
        </Stack>
      </SecuredBox>

      {isLoading ? (
        <Loading />
      ) : !reviews?.content?.length ? (
        <Typography variant="title" align="center">
          {formatMessage({ id: "page.list.empty" })}
        </Typography>
      ) : (
        <>
          <Stack spacing={1}>
            {reviews.content.map((review) => (
              <ReviewItem key={review.id} item={review} />
            ))}
          </Stack>
          <ShowMorePagination
            page={reviews.page + 1}
            totalPages={reviews?.totalPages ?? 0}
            onPageChange={handleSelectPage}
            hideShowMoreButton={reviews?.totalPages > 1}
            onClickShowMore={onClickShowMore}
          />
        </>
      )}
    </>
  );
}

import Typography from "components/Typography";
import Stack from "components/Stack";
import Divider from "components/Divider";
import { useCallback, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import actionsBooks from 'app/actions/books';
import BookFilters from "./BookFilters";
import Loading from "components/Loading";
import BookItem from "./BookItem";
import ShowMorePagination from "app/components/ShowMorePagination";
import 'toastr/build/toastr.min.css';
import Button from "components/Button";
import Link from "components/Link";
import SecuredBox from "app/components/SecuredBox";

const PAGE_SIZE = 10;

function BookList() {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams({
        page: '0',
        size: String(PAGE_SIZE),
        sort: 'title,asc',
    });

    const filter = useMemo(() => {
        const get = (key) => searchParams.get(key) ?? null;
        const getInt = (key) => {
            const value = searchParams.get(key);
            const n = parseInt(value, 10);
            return Number.isInteger(n) ? n : null;
        };
        const getAllInts = (key) => {
            const value = searchParams.get(key);
            if (!value) return [];
            return value
                .split(',')
                .map(v => parseInt(v.trim()))
                .filter(Number.isInteger);
        };

        return {
            page: getInt('page') ?? 0,
            size: getInt('size') ?? PAGE_SIZE,
            sort: get('sort') ?? 'title,asc',
            query: get('query') ?? '',
            minYearPublished: getInt('minYearPublished'),
            maxYearPublished: getInt('maxYearPublished'),
            minPages: getInt('minPages'),
            maxPages: getInt('maxPages'),
            authorIds: getAllInts('authorIds'),
            genreIds: getAllInts('genreIds'),
        };
    }, [searchParams]);

    const { isLoading, books, errors } = useSelector(state => state.books);

    const setParams = useCallback((updater) => {
        setSearchParams(prev => {
            const prevObj = Object.fromEntries(prev);
            const nextObj = typeof updater === 'function' ? updater(prevObj) : updater;

            const next = new URLSearchParams();
            Object.entries(nextObj).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '' &&
                    !(Array.isArray(value) && value.length === 0)) {
                    next.set(key, value);
                }
            });
            return next;
        });
    }, [setSearchParams]);

    useEffect(() => {
        dispatch(actionsBooks.fetchBookPage(filter));
    }, [filter, dispatch]);

    const handleSelectPage = useCallback((page) => {
        setParams(prev => ({ ...prev, page: page - 1 }));
    }, [setParams]);

    const handleChangePageSize = useCallback((size) => {
        setParams(prev => ({ ...prev, size, page: 0 }));
    }, [setParams]);

    const onClickShowMore = () => handleChangePageSize(filter.size + PAGE_SIZE);

    const handleCreateClick = () => {

    };
    const handleDeleteItem = item => {
        dispatch(actionsBooks.deleteBookById(item.id));
        dispatch(actionsBooks.fetchBookPage(filter));
    }

    return (
        <Stack spacing={2} >
            <BookFilters
                filter={filter}
                onFilterChange={setParams}
            />

            <Divider />

            <SecuredBox>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                >
                    <Link href={`/new`}>
                        <Button onClick={handleCreateClick}>
                            {formatMessage({ id: 'page.list.createNewButton.label' })}
                        </Button>
                    </Link>
                </Stack>
            </SecuredBox>

            {isLoading ? (
                <Loading />
            ) : !books?.content?.length ? (
                <Typography variant='title' align="center">
                    {formatMessage({ id: 'page.list.empty' })}
                </Typography>
            ) : (
                <>
                    <Stack spacing={1} >
                        {books.content.map(book => <BookItem key={book.id} item={book} onDelete={handleDeleteItem} />)}
                    </Stack>
                    <ShowMorePagination
                        page={filter.page + 1}
                        totalPages={books?.totalPages ?? 0}
                        onPageChange={handleSelectPage}
                        hideShowMoreButton={books?.totalPages > 1}
                        onClickShowMore={onClickShowMore}
                    />
                </>

            )}
        </Stack>
    );
}


export default BookList;
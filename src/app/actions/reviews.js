import { AlreadyExistsError, NotFoundError } from 'misc/data/common';
import {
  RECEIVE_REVIEWS,
  REQUEST_REVIEWS,
  SET_REVIEW_ERRORS,
  REQUEST_CREATE_REVIEW,
  SUCCESS_CREATE_REVIEW
} from 'app/constants/reviewActionTypes';
import reviewService from 'app/services/real/review';
import uiActions from './ui';

const requestReviews = (filter) => ({
    type: REQUEST_REVIEWS,
    payload: filter
});

const receiveReviews = (page) => ({
    type: RECEIVE_REVIEWS,
    payload: page,
});

const setReviewErrors = (errors) => ({
    type: SET_REVIEW_ERRORS,
    payload: errors
});

const requestCreateReview = (data) => ({
    type: REQUEST_CREATE_REVIEW,
    payload: data,
});

const successCreateReview = (data) => ({
    type: SUCCESS_CREATE_REVIEW,
    payload: data,
});

const handleError = (error, dispatch) => {
    const errors = { global: [], local: [] };

    if (error instanceof NotFoundError) {
        errors.global.push({
            messageId: 'error.notFound',
            values: {}
        });
    } else if (error instanceof AlreadyExistsError) {
        errors.local.push({
            messageId: 'error.validation.book.duplicateTitleAuthor',
            values: {}
        });
    } else if (error?.response) {
        errors.global.push({
            messageId: `error.${error.response.status}`,
            values: error.response.data || {}
        });
    } else if (error?.request) {
        errors.global.push({ messageId: 'error.INTERNAL_SERVER_ERROR', values: {} });
    } else {
        errors.global.push({ messageId: 'error.INTERNAL_SERVER_ERROR', values: { message: error.message } });
    }
    dispatch(setReviewErrors(errors));
};

const fetchReviewsPage = (filter) => async (dispatch) => {
  dispatch(requestReviews(filter));

  try {
    const counts = await reviewService.getCountsByBookIds([filter.bookId]);
    const totalElements = counts.data[filter.bookId];

    const page = filter.page ?? 0;
    const size = filter.size ?? 10;
    const from = page * size;

    const res = await reviewService.searchReviewsByFilter({
      bookId: filter.bookId,
      from,
      size,
    });

    dispatch(receiveReviews({
      content: res.data,
      page,
      size,
      totalElements,
      totalPages: Math.ceil(totalElements / size),
    }));
  } catch (e) {
    handleError(e, dispatch);
  }
};

const createReview = (data) => (dispatch) => {
    dispatch(requestCreateReview(data));
    return reviewService.createReview(data)
        .then(response => dispatch(successCreateReview(response.data)))
        .then(data => dispatch(uiActions.showSuccessToast('page.list.createItem.sucessMessage', {})))
        .catch(error => {
            console.log("error", error);
            handleError(error, dispatch)
        });
};

const exports = {
    fetchReviewsPage,
    createReview
};

export default exports;
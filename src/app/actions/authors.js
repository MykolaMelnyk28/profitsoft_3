import { NotFoundError } from 'misc/data/common';
import {
    RECEIVE_AUTHORS,
    REQUEST_AUTHORS,
    SET_AUTHOR_ERRORS
} from 'app/constants/authorActionTypes';
import authorService from 'app/services/author';

const requestAuthors = (filter) => ({
    type: REQUEST_AUTHORS,
    payload: filter
});

const receiveAuthors = (page) => ({
    type: RECEIVE_AUTHORS,
    payload: page,
});

const setAuthorErrors = (errors) => ({
    type: SET_AUTHOR_ERRORS,
    payload: errors
});

const handleError = (error, dispatch) => {
    console.log("authorError: ", error);
    const errors = { global: [], local: [] };

    if (error instanceof NotFoundError) {
        errors.global.push({
            messageId: 'error.notFound',
            values: {}
        });
    } else if (error.response) {
        errors.global.push({
            messageId: `error.${error.response.status}`,
            values: error.response.data || {}
        });
    } else if (error.request) {
        errors.global.push({ messageId: 'error.INTERNAL_SERVER_ERROR', values: {} });
    } else {
        errors.global.push({ messageId: 'error.INTERNAL_SERVER_ERROR', values: { message: error.message } });
    }
    dispatch(setAuthorErrors(errors));
};

const fetchAuthorPage = (filter) => (dispatch) => {
    dispatch(requestAuthors(filter));

    return authorService.searchAuthorsByFilter(filter)
        .then(response => dispatch(receiveAuthors(response)))
        .catch(error => handleError(error, dispatch));
};

const exports = {
    fetchAuthorPage,
    setAuthorErrors
};

export default exports;
import { AlreadyExistsError, NotFoundError } from 'misc/data/common';
import {
    RECEIVE_GENRES,
    REQUEST_GENRES,
    SET_GENRE_ERRORS
} from 'app/constants/genreActionTypes';
import genreService from 'app/services/real/genre';

const requestGenres = (filter) => ({
    type: REQUEST_GENRES,
    payload: filter
});

const receiveGenres = (page) => ({
    type: RECEIVE_GENRES,
    payload: page,
});

const setGenreErrors = (errors) => ({
    type: SET_GENRE_ERRORS,
    payload: errors
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
    dispatch(setGenreErrors(errors));
};

const fetchGenrePage = (filter) => (dispatch) => {
    dispatch(requestGenres(filter));
    return genreService.searchGenresByFilter(filter)
        .then(response => dispatch(receiveGenres(response.data)))
        .catch(error => handleError(error, dispatch));
};

const exports = {
    fetchGenrePage,
    setGenreErrors
};

export default exports;
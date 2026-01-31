
import {
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    SET_BOOK_ERRORS,
    REQUEST_DELETE_BOOK,
    SUCCESS_DELETE_BOOK,
    REQUEST_BOOK_DETAILS,
    RECEIVE_BOOK_DETAILS,
    REQUEST_CREATE_BOOK,
    REQUEST_UPDATE_BOOK,
    SUCCESS_UPDATE_BOOK,
    SET_BOOKS_STATUS,
    SUCCESS_CREATE_BOOK,
} from 'app/constants/bookActionTypes';
import bookService from 'app/services/real/book';
import { defaultBookFilter } from 'constants/filters';
import uiActions from './ui';
import { AlreadyExistsError, NotFoundError } from 'misc/data/common';

const requestBooks = (filter) => ({
    type: REQUEST_BOOKS,
    payload: filter
});

const receiveBooks = (page) => ({
    type: RECEIVE_BOOKS,
    payload: page,
});

const setBookErrors = (errors) => ({
    type: SET_BOOK_ERRORS,
    payload: errors
});

const requestDeleteBook = (id) => ({
    type: REQUEST_DELETE_BOOK,
    payload: id,
});

const successDeleteBook = () => ({
    type: SUCCESS_DELETE_BOOK,
});

const requestBookDetails = (id) => ({
    type: REQUEST_BOOK_DETAILS,
    payload: id
});

const receiveBookDetails = (details) => ({
    type: RECEIVE_BOOK_DETAILS,
    payload: details
});

const requestCreateBook = (data) => ({
    type: REQUEST_CREATE_BOOK,
    payload: data,
});

const successCreateBook = (data) => ({
    type: SUCCESS_CREATE_BOOK,
    payload: data,
});

const requestUpdateBook = (id, data) => ({
    type: REQUEST_UPDATE_BOOK,
    payload: { id, data },
});

const successUpdateBook = (data) => ({
    type: SUCCESS_UPDATE_BOOK,
    payload: data,
});

const setBooksStatus = (status) => ({
    type: SET_BOOKS_STATUS,
    payload: status
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
        if (error.response.status === 409) {
            errors.local.push({
                messageId: 'error.validation.book.duplicateTitleAuthor',
                values: {}
            });
        } else {
            errors.global.push({
                messageId: `error.${error.response.status}`,
                values: error.response.data || {}
            });
        }
    } else if (error.request) {
        errors.global.push({ messageId: 'error.INTERNAL_SERVER_ERROR', values: {} });
    } else {
        errors.global.push({ messageId: 'error.INTERNAL_SERVER_ERROR', values: { message: error.message } });
    }
    dispatch(setBookErrors(errors));
};

const fetchBookPage = (filter = defaultBookFilter) => (dispatch) => {
    dispatch(requestBooks(filter));
    return bookService.searchBooksByFilter(filter)
        .then(response => dispatch(receiveBooks(response.data)))
        .catch(error => handleError(error, dispatch));
};

const fetchBookDetailsById = (id) => (dispatch) => {
    dispatch(requestBookDetails(id));
    return bookService.getBookById(id)
        .then(response => dispatch(receiveBookDetails(response.data)))
        .catch(error => handleError(error, dispatch));
};

const deleteBookById = (id) => (dispatch, getState) => {
    dispatch(requestDeleteBook(id));
    return bookService.deleteBookById(id)
        .then(_ => dispatch(successDeleteBook()))
        .then(_ => dispatch(uiActions.showSuccessToast('page.list.deleteItem.sucessMessage', {})))
        //.then(_ => dispatch(fetchBookPage(getState().filter)))
        .catch(error => handleError(error, dispatch));
};

const createBook = (data) => (dispatch) => {
    dispatch(requestCreateBook(data));
    return bookService.createBook(data)
        .then(response => dispatch(successCreateBook(response.data)))
        .then(data => dispatch(uiActions.showSuccessToast('page.list.createItem.sucessMessage', {})))
        .catch(error => {
            console.log("error", error);
            handleError(error, dispatch)
        });
};

const updateBookById = (id, data) => async (dispatch) => {
    dispatch(requestUpdateBook(id, data));
    return bookService.updateBookById(id, data)
        .then(response => dispatch(successUpdateBook(response.data)))
        .then(data => dispatch(uiActions.showSuccessToast('page.list.updateItem.sucessMessage', {})))
        .catch(error => handleError(error, dispatch));
};


const exports = {
    fetchBookPage,
    fetchBookDetailsById,
    deleteBookById,
    createBook,
    updateBookById,
    setBookErrors,
    setBooksStatus
};

export default exports;
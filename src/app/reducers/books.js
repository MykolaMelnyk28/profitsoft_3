import {
    SET_BOOK_ERRORS,
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    REQUEST_DELETE_BOOK,
    SUCCESS_DELETE_BOOK,
    REQUEST_BOOK_DETAILS,
    RECEIVE_BOOK_DETAILS,
    REQUEST_CREATE_BOOK,
    SUCCESS_CREATE_BOOK,
    REQUEST_UPDATE_BOOK,
    SUCCESS_UPDATE_BOOK,
    SET_BOOKS_STATUS,
    Status,
} from 'app/constants/bookActionTypes';

const initialState = {
    errors: {
        global: [],
        local: []
    },
    books: {
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
    },
    isLoading: false,
    currentBook: {},
    filter: {},
    status: Status.idle
};


export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BOOKS: {
            return {
                ...state,
                isLoading: true,
                filter: action.payload,
                status: Status.pending,
            };
        }

        case RECEIVE_BOOKS: {
            return {
                ...state,
                isLoading: false,
                books: action.payload,
                status: Status.idle,
            };
        }

        case REQUEST_BOOK_DETAILS: {
            return {
                ...state,
                isLoading: true,
                status: Status.pending,
            };
        }

        case RECEIVE_BOOK_DETAILS: {
            return {
                ...state,
                isLoading: false,
                currentBook: action.payload,
                status: Status.idle,
            };
        }

        case REQUEST_DELETE_BOOK: {
            return {
                ...state,
                isLoading: true,
                status: Status.pending,
            };
        }

        case SUCCESS_DELETE_BOOK: {
            return {
                ...state,
                isLoading: false,
                status: Status.success,
            };
        }

        case REQUEST_CREATE_BOOK: {
            return {
                ...state,
                isLoading: true,
                status: Status.pending,
            }
        }

        case SUCCESS_CREATE_BOOK: {
            return {
                ...state,
                isLoading: false,
                status: Status.success,
            }
        }

        case REQUEST_UPDATE_BOOK: {
            return {
                ...state,
                isLoading: true,
                status: Status.success,
            }
        }

        case SUCCESS_UPDATE_BOOK: {
            return {
                ...state,
                isLoading: false,
                currentBook: action.payload,
                status: Status.success,
            }
        }

        case SET_BOOK_ERRORS: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                status: Status.error,
            };
        }

        case SET_BOOKS_STATUS: {
            return {
                ...state,
                status: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

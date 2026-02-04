import {
    SET_AUTHOR_ERRORS,
    REQUEST_AUTHORS,
    RECEIVE_AUTHORS
} from 'app/constants/authorActionTypes';

const initialState = {
    errors: {
        global: [],
        local: []
    },
    authors: {
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
    },
    isLoading: false,
    currentAuthor: null
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_AUTHORS: {
            return {
                ...state,
                isLoading: true,
                filter: action.payload
            };
        }

        case RECEIVE_AUTHORS: {
            return {
                ...state,
                isLoading: false,
                authors: action.payload
            };
        }

        case SET_AUTHOR_ERRORS: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

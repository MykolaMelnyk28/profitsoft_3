import {
    SET_GENRE_ERRORS,
    REQUEST_GENRES,
    RECEIVE_GENRES
} from 'app/constants/genreActionTypes';

const initialState = {
    errors: {
        global: [],
        local: []
    },
    genres: {
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
    },
    isLoading: false
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_GENRES: {
            return {
                ...state,
                isLoading: true,
                filter: action.payload
            };
        }

        case RECEIVE_GENRES: {
            return {
                ...state,
                isLoading: false,
                genres: action.payload
            };
        }

        case SET_GENRE_ERRORS: {
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

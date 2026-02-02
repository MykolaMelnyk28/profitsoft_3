import {
  RECEIVE_REVIEWS,
  REQUEST_CREATE_REVIEW,
  REQUEST_REVIEWS,
  SET_REVIEW_ERRORS,
  Status,
  SUCCESS_CREATE_REVIEW,
} from 'app/constants/reviewActionTypes';

const initialState = {
  errors: {
    global: [],
    local: []
  },
  reviews: {
    content: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  },
  filter: {},
  isLoading: false,
  status: Status.idle
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_REVIEWS: {
            return {
                ...state,
                isLoading: true,
                filter: action.payload,
                status: Status.pending
            };
        }

        case RECEIVE_REVIEWS: {
            return {
                ...state,
                isLoading: false,
                reviews: action.payload,
                status: Status.idle
            };
        }

        case SET_REVIEW_ERRORS: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                status: Status.error
            };
        }

        case REQUEST_CREATE_REVIEW: {
            return {
                ...state,
                isLoading: true,
                status: Status.pending,
            }
        }

        case SUCCESS_CREATE_REVIEW: {
            return {
                ...state,
                isLoading: false,
                status: Status.success,
            }
        }

        default: {
            return state;
        }
    }
}

import {
  ERROR_RECEIVE_USER,
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_USER,
} from '../constants/actionTypes';

const initialState = {
  authorities: [],
  firstName: '',
  lastName: '',
  email: '',
  errors: [],
  isAuthorized: false,
  isFetchingUser: false,
};

const convertErrors = errors => errors.map(error => ({
  code: error.code,
  description: error.description,
}));

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    
    case RECEIVE_USER: {
      const user = action.payload;

      return {
        ...state,
        authorities: user.authorities || initialState.authorities,
        email: user.email || initialState.email,
        firstName: user.firstName || initialState.firstName,
        id: user.id || initialState.id,
        isAuthorized: true,
        isFetchingUser: false,
        lastName: user.lastName || initialState.lastName,
      };
    }

    case ERROR_RECEIVE_USER:
    case REQUEST_SIGN_OUT: {
      return initialState;
    }

    case REQUEST_USER: {
      return {
        ...state,
        isFetchingUser: true,
      };
    }

    default: {
      return state;
    }
  }
}

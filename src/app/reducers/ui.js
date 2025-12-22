import { SHOW_TOAST, CLEAR_TOAST } from 'app/constants/uiActionTypes';

const initialState = {
  toast: null, // { type, messageId, values }
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        toast: action.payload,
      };

    case CLEAR_TOAST:
      return {
        ...state,
        toast: null,
      };

    default:
      return state;
  }
}
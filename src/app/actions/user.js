import axios from 'misc/requests';
import config from 'config';
import storage, { keys } from 'misc/storage';
import {
  ERROR_RECEIVE_USER,
  RECEIVE_USER,
  REQUEST_SIGN_OUT,
  REQUEST_USER,
} from '../constants/actionTypes';
import userService from 'app/services/real/user';
import uiActions from './ui';

const receiveUser = (user) => ({
  payload: user,
  type: RECEIVE_USER,
});

const requestUser = () => ({
  type: REQUEST_USER,
});

const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const errorReceiveUser = () => ({
  type: ERROR_RECEIVE_USER,
});

const fetchRefreshToken = () => (dispatch) => {

};

const handleError = (err, dispatch) => {
  dispatch(uiActions.showErrorToast('error.INTERNAL_SERVER_ERROR'));
};

const fetchSignOut = () => (dispatch) => {
  dispatch(requestSignOut());
  return userService.signOut()
    .then(response => dispatch(uiActions.showSuccessToast('signOut')))
    .catch(err => handleError(err, dispatch))
};


const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return userService.getUserProfile()
    .then(response => dispatch(receiveUser(response.data)))
    .catch(() => dispatch(errorReceiveUser()));
};

const exportFunctions = {
  fetchRefreshToken,
  fetchSignOut,
  fetchUser,
};

export default exportFunctions;

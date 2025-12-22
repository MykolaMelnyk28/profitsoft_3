import NotificationTypes from 'app/constants/notificationTypes';
import { SHOW_TOAST, CLEAR_TOAST } from 'app/constants/uiActionTypes';

const showToastCreator = payload => ({
  type: SHOW_TOAST,
  payload, // { type, messageId, values }
});

const clearToastCreator = () => ({
  type: CLEAR_TOAST,
});

export const showSuccessToast = (messageId, values = {}) => dispatch => {
  dispatch(showToastCreator({
    type: NotificationTypes.success,
    messageId,
    values
  }));
};

export const showErrorToast = (messageId, values) => dispatch => {
  dispatch(showToastCreator({
    type: NotificationTypes.error,
    messageId,
    values,
  }));
};

export const showInfoToast = (messageId, values) => dispatch => {
  dispatch(showToastCreator({
    type: NotificationTypes.info,
    messageId,
    values,
  }));
};

export const showWarningToast = (messageId, values) => dispatch => {
  dispatch(showToastCreator({
    type: NotificationTypes.warning,
    messageId,
    values,
  }));
};

export const clearToast = () => dispatch => {
    dispatch(clearToastCreator())
}

const exports = {
    showInfoToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast
};

export default exports;
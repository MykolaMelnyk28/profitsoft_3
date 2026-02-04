import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { clearToast } from 'app/actions/ui';

export default function ToastListener() {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const toastEvent = useSelector(state => state.ui.toast);

  useEffect(() => {
    if (!toastEvent) return;

    const message = formatMessage(
      { id: toastEvent.messageId },
      toastEvent.values
    );

    toast[toastEvent.type](message);

    dispatch(clearToast());
  }, [toastEvent, formatMessage, dispatch]);

  return null;
}
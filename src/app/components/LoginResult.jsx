import { Navigate } from "react-router-dom";
import uiActions from 'app/actions/ui';
import { useDispatch } from "react-redux";
import useLocationSearch from "misc/hooks/useLocationSearch";

export default function LoginResult() {
  const dispatch = useDispatch();
  const { result } = useLocationSearch();
  if (result === 'success') {
    dispatch(uiActions.showSuccessToast("signIn.success"));
  } else {
    dispatch(uiActions.showErrorToast("signIn.fail"));
  }
  return <Navigate to="/default" replace />
}
import { useSelector } from "react-redux";

const noOp = () => {};

export default function useSecuredCallback(func) {
  const { isAuthorized, isFetchingUser } = useSelector((state) => state.user);
  if (!isAuthorized || isFetchingUser) {
    return noOp;
  } else {
    return func;
  }
}
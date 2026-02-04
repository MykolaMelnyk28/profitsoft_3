import Loading from "components/Loading";
import { useSelector } from "react-redux";

export default function SecuredBox({ children }) {
  const { isAuthorized, isFetchingUser } = useSelector((state) => state.user);
  return (
    <>
      {isFetchingUser ? (
        <Loading />
      ) : !isAuthorized ? (
        <></>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../features/user/userSlice";
import { errorToast } from "../toast/toasts";

const useErrorHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleError = useCallback(
    (error) => {
      console.log(error);
      if (error?.status === 403 || error?.status === 401) {
        dispatch(userLoggedOut());
        errorToast("Please Login to continue.");
        navigate("/auth", { state: { from: location } });
      } else if (error?.data?.message) {
        errorToast(error?.data?.message);
      } else {
        errorToast("Something went wrong. Please try again later.");
      }
    },
    [dispatch, location, navigate]
  );

  return { handleError };
};

export default useErrorHandler;

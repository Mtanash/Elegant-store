import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  accessTokenRefreshed,
  userDataRefreshed,
} from "../../features/user/userSlice";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import {
  useGetUserAccessTokenMutation,
  useGetUserMutation,
} from "../../features/api/usersApiSlice";

const PersistentLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  let userAccessToken = useSelector((state) => state.user?.accessToken);

  const [fetchAccessToken] = useGetUserAccessTokenMutation();

  const [getUser] = useGetUserMutation();

  useEffect(() => {
    const persistUser = async () => {
      try {
        if (!userAccessToken) {
          const response = await fetchAccessToken();
          dispatch(accessTokenRefreshed(response.data.accessToken));
        }

        const { _id: id } = jwtDecode(userAccessToken);

        const response = await getUser(id).unwrap();

        dispatch(userDataRefreshed(response));
      } catch (error) {
        if (error.message === "Invalid token specified")
          console.log("Invalid Token for decoding");
        else console.log(error);
      } finally {
        setLoading(false);
      }
    };

    persistUser();
  }, [dispatch, fetchAccessToken, getUser, userAccessToken]);
  let content;

  if (loading) {
    content = <LoadingPage fullHeight />;
  } else {
    content = <Outlet />;
  }

  return content;
};

export default PersistentLogin;

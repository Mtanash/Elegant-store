import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import { userDataRefreshed } from "../../features/user/userSlice";
import { publicAxios } from "../../api/axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

const PersistentLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getAccessToken = useRefreshToken();
  let accessToken = useSelector((state) => state.user?.accessToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        accessToken = await getAccessToken();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUser = async () => {
      if (!accessToken) await verifyRefreshToken();

      try {
        const decoded = jwtDecode(accessToken);
        const response = await publicAxios.get(`/users/${decoded?._id}`);
        dispatch(userDataRefreshed(response?.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return loading ? <LoadingPage fullHeight /> : <Outlet />;
};

export default PersistentLogin;

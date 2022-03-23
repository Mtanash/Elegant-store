import { publicAxios } from "../api/axios";
import { useDispatch } from "react-redux";
import { accessTokenRefreshed } from "../features/user/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const getAccessToken = async () => {
    const response = await publicAxios.get("/users/refresh", {
      withCredentials: true,
    });
    dispatch(accessTokenRefreshed(response?.data?.accessToken));
    return response?.data?.accessToken;
  };

  return getAccessToken;
};

export default useRefreshToken;

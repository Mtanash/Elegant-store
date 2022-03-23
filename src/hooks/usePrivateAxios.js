import useRefreshToken from "./useRefreshToken";
import { privateAxios } from "../api/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePrivateAxios = () => {
  const accessToken = useSelector((state) => state.user?.accessToken);
  const getAccessToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error.config;
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true;
          const newAccessToken = await getAccessToken();
          previousRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
          return privateAxios(previousRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, getAccessToken]);

  return privateAxios;
};

export default usePrivateAxios;

import axios from "axios";

const baseURL = "https://elegant-store-api.herokuapp.com/";

const publicAxios = axios.create({
  baseURL,
  withCredentials: true,
});

const privateAxios = axios.create({
  baseURL,
  withCredentials: true,
});

let accessToken;

const getAccessToken = async () => {
  const response = await publicAxios.get("users/refresh");
  accessToken = response?.data?.accessToken;
  return response?.data?.accessToken;
};

privateAxios.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const previousRequest = error?.config;
    if (error?.response?.status === 403 && !previousRequest.sent) {
      previousRequest.sent = true;
      const newAccessToken = await getAccessToken();
      previousRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
      return privateAxios(previousRequest);
    }
    return Promise.reject(error);
  }
);

export { privateAxios, publicAxios };

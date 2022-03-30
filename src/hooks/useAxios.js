import { useEffect, useState } from "react";
import useLogout from "./useLogout";
import { useNavigate, useLocation } from "react-router-dom";

const useAxios = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    try {
      const ctrl = new AbortController();
      setController(ctrl);
      setLoading(true);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      if (err.response.status === 403) {
        // reauthenticate
        await logout();
        navigate("/auth", { state: { from: location } });
      }

      setError(err.message);
      return Promise.reject(err.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [data, loading, error, axiosFetch];
};

export default useAxios;

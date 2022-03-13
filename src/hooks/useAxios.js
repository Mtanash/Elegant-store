import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

const useAxios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
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
      return Promise.resolve("success");
    } catch (err) {
      console.log(err.message);
      console.log(err.response);
      if (err.response.status === 401) {
        // reauthenticate
        dispatch(logoutUser());
        navigate("/auth", { state: { from: location } });
      }

      setError(err.message);
      return Promise.reject("Failed");
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

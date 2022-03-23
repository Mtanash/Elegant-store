import { useState, useEffect } from "react";

const useAxiosDirect = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        isMounted && setResponse(res.data);
      } catch (err) {
        isMounted && setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
      isMounted = false;
    };

    // eslint-disable-next-line
  }, [reload]);

  return [response, loading, error, refetch];
};

export default useAxiosDirect;

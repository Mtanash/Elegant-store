import { useEffect } from "react";
import Orders from "../Orders/Orders";
import LoadingPage from "../LoadingPage/LoadingPage";
import useAxios from "../../hooks/useAxios";
import { privateAxios } from "../../api/axios";
import ErrorPage from "../ErrorPage/ErrorPage";

const ProfileOrdersPage = () => {
  const [orders, ordersLoading, ordersError, axiosFetch] = useAxios();

  useEffect(() => {
    axiosFetch({
      axiosInstance: privateAxios,
      method: "GET",
      url: "orders/me",
    });
  }, []);

  if (ordersLoading) return <LoadingPage />;
  else if (ordersError) return <ErrorPage />;
  else return <Orders orders={orders} title="My Orders" />;
};

export default ProfileOrdersPage;

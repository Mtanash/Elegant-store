import { useEffect } from "react";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Orders from "../../components/Orders/Orders";
import useAxios from "../../hooks/useAxios";
import { privateAxios } from "../../api/axios";

const DashboardOrdersPage = () => {
  const [orders, ordersLoading, ordersError, fetchOrders] = useAxios();

  useEffect(() => {
    fetchOrders({
      axiosInstance: privateAxios,
      method: "GET",
      url: "orders",
    });
  }, []);

  if (ordersLoading) return <LoadingPage />;
  else if (ordersError) return <ErrorPage />;
  else return <Orders orders={orders} title="Orders" />;
};

export default DashboardOrdersPage;

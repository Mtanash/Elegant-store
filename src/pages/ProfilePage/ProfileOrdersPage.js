import { useEffect } from "react";
import Orders from "../../components/Orders/Orders";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import useAxios from "../../hooks/useAxios";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const ProfileOrdersPage = () => {
  const [orders, ordersLoading, ordersError, fetchOrders] = useAxios();
  const privateAxios = usePrivateAxios();

  useEffect(() => {
    fetchOrders({
      axiosInstance: privateAxios,
      method: "GET",
      url: "users/me/orders",
    });
  }, []);

  if (ordersLoading) return <LoadingPage />;
  else if (ordersError) return <ErrorPage />;
  else return <Orders orders={orders} title="My Orders" />;
};

export default ProfileOrdersPage;

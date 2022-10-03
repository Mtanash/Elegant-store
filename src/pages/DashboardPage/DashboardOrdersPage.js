import Orders from "../../components/Orders";
import { useGetOrdersQuery } from "../../features/api/ordersApiSlice";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

const DashboardOrdersPage = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersQuery();

  if (ordersLoading) return <LoadingPage />;
  else if (ordersError) return <ErrorPage />;
  else return <Orders orders={orders} title="Orders" />;
};

export default DashboardOrdersPage;

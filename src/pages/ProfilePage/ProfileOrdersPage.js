import Orders from "../../components/Orders";
import { useGetUserOrdersQuery } from "../../features/api/usersApiSlice";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

const ProfileOrdersPage = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetUserOrdersQuery();

  if (ordersLoading) return <LoadingPage />;
  else if (ordersError) return <ErrorPage />;
  else return <Orders orders={orders} title="My Orders" />;
};

export default ProfileOrdersPage;

import Chart from "../../components/Chart/Chart";
import Deposits from "../../components/Deposits/Deposits";
import Orders from "../../components/Orders/Orders";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import { useGetDashboardDataQuery } from "../../features/api/dashboardApiSlice";

const DashboardInfo = () => {
  const {
    data: dashboardData,
    isLoading: dashboardDataLoading,
    error: dashboardDataError,
  } = useGetDashboardDataQuery();

  if (dashboardDataLoading) return <LoadingPage fullHeight />;
  else if (dashboardDataError) return <ErrorPage fullHeight />;
  else
    return (
      <div className="flex flex-col flex-wrap gap-2">
        <Chart />
        <div className="shrink-0">
          <Deposits totalDeposits="2500" />
        </div>
        <Orders
          title="Latest Orders"
          orders={dashboardData}
          showAllOrders={true}
        />
      </div>
    );
};

export default DashboardInfo;

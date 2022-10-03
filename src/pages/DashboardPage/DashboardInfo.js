import Chart from "../../components/Chart";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";
import { useGetDashboardDataQuery } from "../../features/api/dashboardApiSlice";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

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

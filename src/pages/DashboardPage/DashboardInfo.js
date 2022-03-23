import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Chart from "../../components/Chart/Chart";
import Deposits from "../../components/Deposits/Deposits";
import Orders from "../../components/Orders/Orders";
import useAxios from "../../hooks/useAxios";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const DashboardInfo = () => {
  const privateAxios = usePrivateAxios();
  const [
    dashboardData,
    dashboardDataLoading,
    dashboardDataError,
    fetchDashboardData,
  ] = useAxios();

  useEffect(() => {
    fetchDashboardData({
      axiosInstance: privateAxios,
      method: "GET",
      url: "dashboard",
    });
  }, []);

  if (dashboardDataLoading) return <LoadingPage fullHeight={true} />;
  else if (dashboardDataError) return <ErrorPage />;
  else
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Chart />
          </Grid>
          <Grid item xs={4}>
            <Deposits totalDeposits="2500" />
          </Grid>
          <Grid item xs={12}>
            <Orders
              title="Latest Orders"
              orders={dashboardData}
              showAllOrders={true}
            />
          </Grid>
        </Grid>
      </Box>
    );
};

export default DashboardInfo;

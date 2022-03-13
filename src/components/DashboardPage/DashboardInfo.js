import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "../Orders/Orders";
import useAxios from "../../hooks/useAxios";
import { privateAxios } from "../../api/axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";

const DashboardInfo = () => {
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

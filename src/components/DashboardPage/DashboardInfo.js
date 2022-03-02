import { useEffect, useState } from "react";
import { getDashboardData } from "../../api/dashboard";
import { Box, Grid, CircularProgress } from "@mui/material";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "../Orders/Orders";

const DashboardInfo = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await getDashboardData();
        setDashboardData({ latestOrders: response?.data });
      } catch (err) {
        console.log(err?.response?.data);
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
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
              orders={dashboardData.latestOrders}
              showAllOrders={true}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardInfo;

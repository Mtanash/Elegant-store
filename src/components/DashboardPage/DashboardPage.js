import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddProductForm from "../AddProductForm/AddProductForm";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const orders = [
  {
    _id: "1",
    orderInfo: {
      firstName: "first name",
    },
    orderStatus: "confirmed",
    orderTotalPrice: 1500,
    createdAt: "2022-02-09T18:01:27.155+00:00",
  },
  {
    _id: "2",
    orderInfo: {
      firstName: "first name",
    },
    orderStatus: "confirmed",
    orderTotalPrice: 1700,
    createdAt: "2022-01-03T18:01:27.155+00:00",
  },
  {
    _id: "3",
    orderInfo: {
      firstName: "first name",
    },
    orderStatus: "shipped",
    orderTotalPrice: 360,
    createdAt: "2022-01-08T18:01:27.155+00:00",
  },
  {
    _id: "4",
    orderInfo: {
      firstName: "first name",
    },
    orderStatus: "delivered",
    orderTotalPrice: 1050,
    createdAt: "2022-02-02T18:01:27.155+00:00",
  },
];

const Deposits = () => {
  return (
    <Paper elevation={3} sx={{ padding: "10px", height: "100%" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Deposits
      </Typography>
      <Typography component="h3" variant="h4">
        $2500.00
      </Typography>
      <Typography
        component="h3"
        variant="subtitle1"
        gutterBottom
        sx={{ color: "#333" }}
      >
        on 12 March, 2021
      </Typography>
      <Link
        sx={{ paddingTop: "25px" }}
        component="button"
        variant="body2"
        onClick={() => {
          console.info("I'm a button.");
        }}
      >
        View balance
      </Link>
    </Paper>
  );
};
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Chart = () => {
  return (
    <Paper elevation={3} sx={{ height: "100%", padding: "20px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          <CartesianGrid stroke="#ccc" strokeDasharray="6 6" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const DashboardView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Chart />
      </Grid>
      <Grid item xs={4}>
        <Deposits />
      </Grid>
      <Grid item xs={12}>
        <OrdersView title="Latest Orders" orders={orders} />
      </Grid>
    </Grid>
  );
};

const OrdersView = ({ title, orders, showAllOrders = true }) => {
  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", height: "100%", padding: "15px" }}
    >
      {title && (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
      )}

      <TableContainer>
        <Table aria-label="orders table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Order#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => {
              const {
                _id,
                orderInfo: { firstName, lastName },
                orderStatus,
                orderTotalPrice,
                createdAt,
              } = order;
              return (
                <TableRow
                  key={_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#eee",
                    },
                  }}
                  onClick={() => console.log("clicked", _id)}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>
                    {firstName} {lastName}
                  </TableCell>
                  <TableCell>
                    {moment(createdAt).format("D MMMM YYYY")}
                  </TableCell>
                  <TableCell>{orderStatus}</TableCell>
                  <TableCell>{orderTotalPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showAllOrders && (
        <Link
          sx={{ paddingTop: "25px" }}
          component="button"
          variant="body2"
          onClick={() => {
            console.info("I'm a button.");
          }}
        >
          Show all orders
        </Link>
      )}
    </Paper>
  );
};

const DashboardViewComponent = ({ viewComponent }) => {
  if (viewComponent === "dashboard") {
    return <DashboardView />;
  } else if (viewComponent === "orders") {
    return <OrdersView title="Orders" orders={orders} showAllOrders={false} />;
  } else if (viewComponent === "addProduct") {
    return <AddProductForm />;
  }
};

const DashboardPage = () => {
  const [viewComponent, setViewComponent] = useState("dashboard");

  return (
    <Box sx={{ minHeight: "calc(100vh - 124px)", display: "flex" }}>
      <Paper
        square
        variant="outlined"
        sx={{
          padding: "10px 0",
        }}
      >
        <MenuList sx={{ "&>li": { padding: "15px 10px" } }}>
          <MenuItem onClick={() => setViewComponent("dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setViewComponent("orders")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setViewComponent("addProduct")}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>Add Product</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
      <Box
        sx={{
          flex: "1",
          display: "grid",
          placeItems: "center",
          padding: "20px",
        }}
      >
        <DashboardViewComponent viewComponent={viewComponent} />
      </Box>
    </Box>
  );
};

export default DashboardPage;

import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  CircularProgress,
  Box,
} from "@mui/material";

import moment from "moment";

import { useEffect, useState } from "react";
import { getOrders } from "../../api/orderApi";

import { useNavigate } from "react-router-dom";

const Orders = ({ title, orders, showAllOrders = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchedOrders, setFetchedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrders();
        setFetchedOrders(response?.data);
      } catch (err) {
        console.log(err?.response?.data);
      }
      setLoading(false);
    };

    if (!orders) fetchOrders();
    else setFetchedOrders(orders);
  }, [orders]);

  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", height: "100%", padding: "15px" }}
    >
      {loading ? (
        <Box sx={{ display: "grid", placeItems: "center", width: "100%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {title && (
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {title}
            </Typography>
          )}

          {fetchedOrders?.length === 0 ? (
            <Typography>No orders</Typography>
          ) : (
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
                  {fetchedOrders.map((order, index) => {
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
          )}

          {showAllOrders && (
            <Link
              sx={{ paddingTop: "25px" }}
              component="button"
              variant="body2"
              onClick={() => {
                navigate("../orders");
              }}
            >
              Show all orders
            </Link>
          )}
        </>
      )}
    </Paper>
  );
};

export default Orders;

import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Orders = ({ title, orders, showAllOrders = false }) => {
  const navigate = useNavigate();

  const handleOrderClick = (orderId) => {
    navigate(`${orderId}`);
  };

  return (
    <div className="shadow-special w-full h-full p-4">
      {title && <p className="text-xl mb-4">{title}</p>}

      {orders?.length === 0 ? (
        <p>No orders</p>
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
              {orders.map((order, index) => {
                const {
                  _id,
                  info: { firstName, lastName },
                  status,
                  totalPrice,
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
                    onClick={() => handleOrderClick(_id)}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>
                      {firstName} {lastName}
                    </TableCell>
                    <TableCell>
                      {moment(createdAt).format("D MMMM YYYY")}
                    </TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{totalPrice.toFixed(2)}</TableCell>
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
    </div>
  );
};

export default Orders;

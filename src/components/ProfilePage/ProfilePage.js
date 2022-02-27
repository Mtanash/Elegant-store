// react
import { useState } from "react";
import useUserFavoriteProducts from "../../hooks/useUserFavoriteProducts";
import useUserOrders from "../../hooks/useUserOrders";
import ProductCard from "../ProductCard/ProductCard";
// packages
import FileBase from "react-file-base64";
import moment from "moment";
// material ui
import {
  Avatar,
  Button,
  Container,
  Typography,
  Modal,
  Divider,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  removeProductFromFavorite,
  selectCurrentUser,
  updateUserAvatar,
} from "../../features/user/userSlice";
// react router
import { useNavigate } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
};

const ProfilePage = () => {
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [favoriteProducts, favoriteProductsLoading] = useUserFavoriteProducts();
  const [orders, ordersLoading] = useUserOrders();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => {
    if (!user) return navigate("/auth");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const updateAvatar = () => {
    setLoading(true);

    dispatch(updateUserAvatar({ avatar }))
      .unwrap()
      .then((res) => {
        setLoading(false);
        handleClose();
      });
  };

  const onRemoveButtonClicked = (_id) =>
    dispatch(removeProductFromFavorite({ _id }));

  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: "calc(100vh - 124px)", padding: "40px 0" }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <UserAvatar
          user={user}
          styles={{ width: "100px", height: "100px", margin: "auto" }}
        />
        <Button variant="outlined" size="small" onClick={handleOpen}>
          Update profile picture
        </Button>
        <Typography variant="h4" align="center" gutterBottom mt="15px">
          {user?.name}
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <Typography variant="h5" sx={{ alignSelf: "flex-start" }}>
          Favorite products
        </Typography>
        {!!favoriteProducts.length ? (
          <Stack
            spacing={1}
            sx={{
              width: "80%",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {favoriteProductsLoading ? (
              <CircularProgress sx={{ alignSelf: "center" }} />
            ) : (
              favoriteProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  {...product}
                  onRemoveButtonClicked={onRemoveButtonClicked}
                />
              ))
            )}
          </Stack>
        ) : (
          <>
            <Typography>No favorite products</Typography>
            <Typography variant="body2">
              Go to &nbsp;
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/")}
              >
                products
              </Link>
              &nbsp; and add some products to favorite.
            </Typography>
          </>
        )}
        <Divider sx={{ width: "100%" }} />
        <Typography variant="h5" sx={{ alignSelf: "flex-start" }}>
          Orders
        </Typography>
        {!!orders.length ? (
          <Stack
            spacing={1}
            sx={{
              width: "80%",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {ordersLoading ? (
              <CircularProgress sx={{ alignSelf: "center" }} />
            ) : (
              <TableContainer component={Paper}>
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
                    {orders.map((order, index) => (
                      <TableRow
                        key={order._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell>
                          {order.orderInfo.firstName} {order.orderInfo.lastName}
                        </TableCell>
                        <TableCell>
                          {moment(order.createdAt).format("D MMMM YYYY")}
                        </TableCell>
                        <TableCell>{order.orderStatus}</TableCell>
                        <TableCell>{order.orderTotalPrice}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        ) : (
          <>
            <Typography>No orders</Typography>
            <Typography variant="body2">
              Go to &nbsp;
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/")}
              >
                products
              </Link>
              &nbsp; and add some products to cart and checkout to make an
              order.
            </Typography>
          </>
        )}
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="pick-file-modal"
      >
        <Box sx={style}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setAvatar(base64)}
          />
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={updateAvatar}
          >
            Save
          </LoadingButton>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProfilePage;

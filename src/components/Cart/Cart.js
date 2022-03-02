import { useDispatch, useSelector } from "react-redux";
import {
  productRemovedFromCart,
  selectCartProducts,
  selectCartProductsCount,
  selectCartProductsTotalPrice,
} from "../../features/Cart/cartSlice";
import { selectCurrentUser } from "../../features/user/userSlice";

import { useNavigate } from "react-router-dom";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
import ProductCard from "../ProductCard/ProductCard";

import { Box, Button, Link, Typography } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);
  const cartProductsCount = useSelector(selectCartProductsCount);
  const user = useSelector(selectCurrentUser);

  const cartTotalPrice = useSelector(selectCartProductsTotalPrice);

  const toggleCheckoutForm = () => {
    document.getElementById("checkout-form").classList.toggle("active");
  };

  const onCheckoutClick = () => {
    if (!user) return navigate("/auth");
    toggleCheckoutForm();
  };

  const onRemoveButtonClicked = (_id) => dispatch(productRemovedFromCart(_id));

  return (
    <Box
      sx={{ width: "70%", margin: "0 auto", minHeight: "calc(100vh - 124px)" }}
    >
      {cartProductsCount > 0 ? (
        <Typography variant="h4" align="center" sx={{ padding: "20px 10px" }}>
          There are {cartProductsCount}
          {cartProductsCount > 1 ? " items" : " item"} in cart.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "100px",
          }}
        >
          <Typography variant="h4" align="center" sx={{ padding: "20px 10px" }}>
            Cart is empty
          </Typography>
          <Link
            sx={{ paddingTop: "25px" }}
            component="button"
            variant="body1"
            onClick={() => navigate("/")}
          >
            Shop Now
          </Link>
        </Box>
      )}
      {cartProducts.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
          onRemoveButtonClicked={onRemoveButtonClicked}
        />
      ))}
      {cartProductsCount > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" className="total-price">
            Total price: ${cartTotalPrice}.00
          </Typography>
          <Button variant="contained" onClick={onCheckoutClick}>
            Proceed to checkout
          </Button>
        </Box>
      )}
      <CheckoutForm toggleCheckoutForm={toggleCheckoutForm} />
    </Box>
  );
};

export default Cart;

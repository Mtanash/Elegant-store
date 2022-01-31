import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CartProduct from "./CartProduct/CartProduct";
import {
  selectCartProducts,
  selectCartProductsCount,
  selectCartProductsTotalPrice,
} from "../../features/Cart/cartSlice";
import { selectCurrentUser } from "../../features/user/userSlice";
import { Box, Button, Typography } from "@mui/material";
import "../../css/Cart/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);
  const cartProductsCount = useSelector(selectCartProductsCount);
  const user = useSelector(selectCurrentUser)?.user;

  const cartTotalPrice = useSelector(selectCartProductsTotalPrice);

  const toggleCheckoutForm = () => {
    document.getElementById("checkout-form").classList.toggle("active");
  };

  const onCheckoutClick = () => {
    if (!user?.name) return navigate("/auth");
    toggleCheckoutForm();
  };

  return (
    <section className="cart">
      <Typography variant="h4" align="center" sx={{ padding: "20px 10px" }}>
        {cartProductsCount > 0
          ? `There are ${cartProductsCount} ${
              cartProductsCount > 1 ? "items" : "item"
            } in cart.`
          : "Cart is empty"}
      </Typography>
      {cartProducts.map((product) => (
        <CartProduct key={product._id} {...product} />
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
    </section>
  );
};

export default Cart;

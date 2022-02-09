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

import { Box, Button, Typography } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
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

  const onRemoveButtonClicked = (_id) => dispatch(productRemovedFromCart(_id));

  return (
    <Box
      sx={{ width: "70%", margin: "0 auto", minHeight: "calc(100vh - 124px)" }}
    >
      <Typography variant="h4" align="center" sx={{ padding: "20px 10px" }}>
        {cartProductsCount > 0
          ? `There are ${cartProductsCount} ${
              cartProductsCount > 1 ? "items" : "item"
            } in cart.`
          : "Cart is empty"}
      </Typography>
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

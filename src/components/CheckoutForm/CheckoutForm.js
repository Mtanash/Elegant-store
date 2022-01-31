import React, { useState } from "react";
import {
  cartCleared,
  selectCartProducts,
  selectCartProductsTotalPrice,
} from "../../features/Cart/cartSlice";
import { selectCurrentUser } from "../../features/user/userSlice";
import { createOrder } from "../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "../../css/CheckoutForm/CheckoutForm.css";

const initialFormDataState = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
};

const CheckoutForm = ({ toggleCheckoutForm }) => {
  // cart info
  const cartProducts = useSelector(selectCartProducts);
  const cartProductsTotalPrice = useSelector(selectCartProductsTotalPrice);
  const user = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormDataState);
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();

    const order = {
      orderOwner: user._id,
      orderProducts: cartProducts.map((product) => ({ _id: product._id })),
      orderTotalPrice: cartProductsTotalPrice,
      orderStatus: "confirmed",
      orderInfo: { ...formData },
    };

    dispatch(createOrder(order))
      .unwrap()
      .then((res) => {
        // Todo add order to the user data
        toggleCheckoutForm();
        setFormData(initialFormDataState);
        dispatch(cartCleared());
        navigate("/");
      });
  };
  return (
    <div className="checkout-form" id="checkout-form">
      <h5>Shipping information</h5>
      <button className="close-button" onClick={toggleCheckoutForm}>
        &#10005;
      </button>
      <form onSubmit={onFormSubmit}>
        <div>
          <TextField
            label="First Name"
            type="text"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleFormData}
          />
          <TextField
            label="Last Name"
            type="text"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleFormData}
          />
        </div>
        <TextField
          label="Address"
          type="text"
          required
          name="address"
          fullWidth
          value={formData.address}
          onChange={handleFormData}
        />
        <TextField
          label="Phone Number"
          type="text"
          required
          name="phoneNumber"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleFormData}
        />

        <Button variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;

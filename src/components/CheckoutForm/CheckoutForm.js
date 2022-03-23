import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  cartCleared,
  selectCartProducts,
  selectCartProductsTotalPrice,
} from "../../features/Cart/cartSlice";

import { useNavigate } from "react-router-dom";

import { TextField, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import NumberFormat from "react-number-format";

import "../../css/CheckoutForm/CheckoutForm.css";

const initialFormDataState = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  creditNumber: "",
  creditExpMonth: "",
  creditExpYear: "",
  creditCVC: "",
};

const CheckoutForm = ({ toggleCheckoutForm }) => {
  const privateAxios = usePrivateAxios();
  const cartProducts = useSelector(selectCartProducts);
  const cartProductsTotalPrice = useSelector(selectCartProductsTotalPrice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormDataState);
  const [
    createdOrder,
    createdOrderLoading,
    createdOrderError,
    fetchCreatedOrder,
  ] = useAxios();

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const order = {
      orderProducts: cartProducts.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
      orderTotalPrice: cartProductsTotalPrice.total,
      orderInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
      },
      paymentMethodInfo: {
        creditNumber: formData.creditNumber,
        creditExpMonth: formData.creditExpMonth,
        creditExpYear: formData.creditExpYear,
        creditCVC: formData.creditCVC,
      },
    };

    fetchCreatedOrder({
      axiosInstance: privateAxios,
      method: "POST",
      url: "orders",
      requestConfig: {
        ...order,
      },
    }).then(() => {
      toggleCheckoutForm();
      setFormData(initialFormDataState);
      dispatch(cartCleared());
      navigate("/");
    });
  };

  const limit = (val, max) => {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  };

  const cardExpiry = (val) => {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);

    return month + (year.length ? "/" + year : "");
  };

  return (
    <Box className="checkout-form" id="checkout-form">
      <Typography variant="h4" gutterBottom align="center">
        Shipping information
      </Typography>
      <button className="close-button" onClick={toggleCheckoutForm}>
        &#10005;
      </button>
      <form onSubmit={onFormSubmit}>
        <Typography
          align="left"
          variant="subtitle1"
          sx={{ alignSelf: "flex-start" }}
        >
          Shipping information
        </Typography>
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

        <Typography
          align="left"
          variant="subtitle1"
          sx={{ alignSelf: "flex-start" }}
        >
          Payment information
        </Typography>

        <NumberFormat
          customInput={TextField}
          label="Credit Number"
          format="#### #### #### ####"
          required
          fullWidth
          placeholder="xxxx xxxx xxxx xxxx"
          mask="_"
          value={formData.creditNumber}
          onValueChange={(e) =>
            setFormData({ ...formData, creditNumber: e.floatedValue })
          }
        />
        <div>
          <NumberFormat
            customInput={TextField}
            label="Credit Expiry"
            fullWidth
            required
            format={cardExpiry}
            placeholder="MM/YY"
            mask={["M", "M", "Y", "Y"]}
            onValueChange={(e) => {
              if (e.formattedValue.length === 5) {
                const month = e.formattedValue.slice(0, 2);
                const year = e.formattedValue.slice(3, 5);
                setFormData({
                  ...formData,
                  creditExpMonth: parseInt(month),
                  creditExpYear: parseInt(year),
                });
              }
            }}
          />
          <NumberFormat
            customInput={TextField}
            fullWidth
            required
            label="Credit CVC"
            format="###"
            placeholder="xxx"
            onValueChange={(e) =>
              setFormData({ ...formData, creditCVC: e.floatedValue })
            }
          />
        </div>

        <LoadingButton
          loading={createdOrderLoading}
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </LoadingButton>
      </form>
    </Box>
  );
};

export default CheckoutForm;

import { useState, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  cartCleared,
  selectCartProducts,
  selectCartProductsTotalPrice,
} from "../../features/Cart/cartSlice";

import { useNavigate } from "react-router-dom";

import NumberFormat from "react-number-format";

import SnackbarContext from "../../context/SnackbarContext";

import LoadingButton from "../LoadingButton/LoadingButton";

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

const CheckoutForm = ({ checkoutFormIsOpen, toggleCheckoutForm }) => {
  const { openSnackbar } = useContext(SnackbarContext);
  const privateAxios = usePrivateAxios();
  const cartProducts = useSelector(selectCartProducts);
  const cartProductsTotalPrice = useSelector(selectCartProductsTotalPrice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormDataState);
  const [, createdOrderLoading, , fetchCreatedOrder] = useAxios();

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

      openSnackbar("Order created successfully");
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
    <section
      className={`fixed inset-0 p-6 bg-white transition-transform duration-500 ease-in-out h-auto overflow-auto grid place-items-center ${
        !checkoutFormIsOpen ? "translate-y-full" : null
      }`}
    >
      <div className="flex flex-col gap-8 justify-center items-center pb-10 w-full">
        <p className="text-3xl font-bold text-center mt-8">Checkout</p>
        <button
          className="bg-red text-white w-9 h-9 rounded-md font-semibold hover:bg-deep-red transition-colors absolute top-3 right-3"
          onClick={toggleCheckoutForm}
        >
          &#10005;
        </button>
        <form className="w-full sm:w-[70%]" onSubmit={onFormSubmit}>
          <p className="text-left font-semibold text-xl mb-4 pl-2 border-l-4 border-deep-orange">
            Shipping information
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-1">
              <div className="flex flex-col gap-1 grow">
                <label className="font-semibold" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="w-full rounded-md p-2 px-3 border-opacity-60 outline-none border-2 border-pale-grey hover:border-deep-blue focus:border-pale-red transition-colors"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleFormData}
                />
              </div>

              <div className="flex flex-col gap-1 grow">
                <label className="font-semibold" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="w-full rounded-md p-2 px-3 border-opacity-60 outline-none border-2 border-pale-grey hover:border-deep-blue focus:border-pale-red transition-colors"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleFormData}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold" htmlFor="address">
                Address
              </label>
              <input
                className="w-full rounded-md p-2 px-3 border-opacity-60 outline-none border-2 border-pale-grey hover:border-deep-blue focus:border-pale-red transition-colors"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleFormData}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="w-full rounded-md p-2 px-3 border-opacity-60 outline-none border-2 border-pale-grey hover:border-deep-blue focus:border-pale-red transition-colors"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                value={formData.phoneNumber}
                onChange={handleFormData}
              />
            </div>

            <p className="text-left font-semibold text-xl mb-4 pl-2 border-l-4 border-deep-orange">
              Payment information
            </p>

            <div className="flex flex-col gap-1">
              <label className="font-semibold" htmlFor="creditNumber">
                Credit Number
              </label>
              <NumberFormat
                className="w-full rounded-md p-2 px-3 border-opacity-60 outline-none border-2 border-pale-grey hover:border-deep-blue focus:border-pale-red transition-colors"
                id="creditNumber"
                format="#### #### #### ####"
                required
                placeholder="xxxx xxxx xxxx xxxx"
                mask="_"
                value={formData.creditNumber}
                onValueChange={(e) =>
                  setFormData({ ...formData, creditNumber: e.floatedValue })
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-1">
              <div className="flex flex-col gap-1 grow">
                <label className="font-semibold" htmlFor="creditExpiry">
                  Credit Expiry
                </label>
                <NumberFormat
                  className="w-full rounded-md p-2 px-3 border-opacity-60 outline-none border-2 border-pale-grey hover:border-deep-blue focus:border-pale-red transition-colors"
                  id="creditExpiry"
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
              </div>

              <div className="flex flex-col gap-1 grow">
                <label className="font-semibold" htmlFor="creditCVC">
                  Credit CVC
                </label>
                <NumberFormat
                  className="w-full rounded-md p-2 px-3 border-opacity-60 outline-none border-2 border-pale-grey hover:border-deep-blue focus:border-pale-red transition-colors"
                  id="creditCVC"
                  required
                  format="###"
                  placeholder="xxx"
                  onValueChange={(e) =>
                    setFormData({ ...formData, creditCVC: e.floatedValue })
                  }
                />
              </div>
            </div>

            <LoadingButton
              text="Submit"
              loading={createdOrderLoading}
              submit
              color="blue"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;

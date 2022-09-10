import { useDispatch, useSelector } from "react-redux";
import {
  productRemovedFromCart,
  selectCartProducts,
  selectCartProductsCount,
  selectCartProductsTotalPrice,
} from "../../features/Cart/cartSlice";
import { selectCurrentUser } from "../../features/user/userSlice";

import { useNavigate } from "react-router-dom";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import HorizontalProductCard from "../../components/HorizontalProductCard/HorizontalProductCard";

import { useState } from "react";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);
  const cartProductsCount = useSelector(selectCartProductsCount);
  const user = useSelector(selectCurrentUser);

  const { total: cartTotalPrice } = useSelector(selectCartProductsTotalPrice);

  const [checkoutFormIsOpen, setCheckoutFormIsOpen] = useState(false);

  const toggleCheckoutForm = () => {
    setCheckoutFormIsOpen(!checkoutFormIsOpen);
  };

  const onCheckoutClick = () => {
    if (!user) return navigate("/auth");
    toggleCheckoutForm();
  };

  const onRemoveButtonClicked = (_id) => dispatch(productRemovedFromCart(_id));

  return (
    <section className="overflow-hidden min-h-[calc(100vh_-_theme(headerAndFooterHeight))] container mx-auto mb-10 p-4">
      {cartProductsCount > 0 ? (
        <p className="text-center font-bold text-2xl my-6">
          There {cartProductsCount > 1 ? " are" : " is"} {cartProductsCount}
          {cartProductsCount > 1 ? " items" : " item"} in cart.
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center pt-24">
          <p className="text-center font-bold text-2xl p-4">Cart is empty</p>
          <button className="hover:underline" onClick={() => navigate("/")}>
            Shop Now
          </button>
        </div>
      )}
      {cartProducts.map((product) => (
        <HorizontalProductCard
          key={product._id}
          {...product}
          onRemoveButtonClicked={() => onRemoveButtonClicked(product._id)}
        />
      ))}
      {cartProductsCount > 0 && (
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">
            Total price: EGP {cartTotalPrice}.00
          </p>
          <button
            className="py-2 px-6 bg-deep-orange rounded-md text-white text-lg font-semibold hover:scale-95 transition-transform"
            onClick={onCheckoutClick}
          >
            Proceed to checkout
          </button>
        </div>
      )}
      <CheckoutForm
        toggleCheckoutForm={toggleCheckoutForm}
        checkoutFormIsOpen={checkoutFormIsOpen}
      />
    </section>
  );
};

export default CartPage;

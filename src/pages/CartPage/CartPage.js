import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import FullPageLayout from "../../components/FullPageLayout/FullPageLayout";
import HorizontalProductCard from "../../components/HorizontalProductCard/HorizontalProductCard";
import Price from "../../components/Price/Price";
import {
  productRemovedFromCart,
  selectCartProducts,
  selectCartProductsCount,
  selectCartProductsTotalPrice,
} from "../../features/Cart/cartSlice";
import { selectCurrentUser } from "../../features/user/userSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);
  const cartProductsCount = useSelector(selectCartProductsCount);
  const user = useSelector(selectCurrentUser);

  const { total: cartTotalPrice } = useSelector(selectCartProductsTotalPrice);

  const [checkoutFormIsOpen, setCheckoutFormIsOpen] = useState(false);

  const toggleCheckoutForm = useCallback(() => {
    setCheckoutFormIsOpen(!checkoutFormIsOpen);
  }, [checkoutFormIsOpen]);

  const onCheckoutClick = () => {
    if (!user) return navigate("/auth");
    toggleCheckoutForm();
  };

  const onRemoveButtonClicked = useCallback(
    (_id) => dispatch(productRemovedFromCart(_id)),
    [dispatch]
  );

  return (
    <FullPageLayout>
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
      {cartProductsCount !== 0 && (
        <div className="w-full flex gap-2 items-center text-slate-500">
          <p className="uppercase flex-[0.4] text-center text-inherit">
            Product details
          </p>
          <p className="uppercase flex-[0.2] text-center text-inherit">
            Quantity
          </p>
          <p className="uppercase flex-[0.2] text-center text-inherit">Price</p>
          <p className="uppercase flex-[0.2] text-center text-inherit">Total</p>
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
          <div className="flex items-start gap-3">
            <p className="font-semibold text-lg">Total price:</p>
            <Price price={cartTotalPrice} center />
          </div>
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
    </FullPageLayout>
  );
};

export default CartPage;

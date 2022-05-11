import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartProductsCount } from "../../features/Cart/cartSlice";

const CartIcon = () => {
  const navigate = useNavigate();
  const cartProductsCount = useSelector(selectCartProductsCount);

  const onCartIconClick = () => navigate("/cart");

  return (
    <div className="relative cursor-pointer" onClick={onCartIconClick}>
      <AiOutlineShoppingCart className="w-8 h-8 text-grey hover:text-deep-blue transition-colors ease-in-out duration-200" />
      {cartProductsCount > 0 && (
        <div className="absolute bg-deep-orange text-white font-normal text-sm w-5 h-5 rounded-full flex items-center justify-center -top-1.5 -right-1.5 ">
          {cartProductsCount}
        </div>
      )}
    </div>
  );
};

export default CartIcon;

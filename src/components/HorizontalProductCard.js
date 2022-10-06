import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cartProductQuantityDecreased,
  cartProductQuantityIncreased,
} from "../features/Cart/cartSlice";
import { truncateString } from "../utils";
import Price from "./Price";

const HorizontalProductCard = ({
  description,
  quantity,
  price,
  priceAfterDiscount,
  imageUrl,
  _id,
  onRemoveButtonClicked,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleQuantityIncrementClick = () => {
    dispatch(cartProductQuantityIncreased(_id));
  };

  const handleQuantityDecrementClick = () => {
    if (quantity < 2) {
      return onRemoveButtonClicked();
    }
    dispatch(cartProductQuantityDecreased(_id));
  };

  return (
    <div
      key={_id}
      className="flex justify-center items-center my-4 border-b-2 border-pale-grey border-opacity-30 pb-4 w-full gap-2"
    >
      <div className="flex-[0.4] flex items-center justify-center text-center">
        <img
          className="w-20 h-20 cursor-pointer md:inline-block hidden"
          src={imageUrl}
          alt={description}
          onClick={() => navigate(`/product/${_id}`)}
        />

        <div className="flex-1 basis-[55%]">
          <p
            className="md:text-lg text-base font-semibold mb-2 max-w-[50ch] break-words cursor-pointer"
            onClick={() => navigate(`/product/${_id}`)}
          >
            {truncateString(description, 30)}
          </p>
        </div>
      </div>
      <div className="flex-[0.2] flex md:flex-row flex-col items-center gap-2 text-center justify-center">
        <button
          className="border-2 h-7 w-7 grid place-items-center border-gray-300"
          onClick={handleQuantityDecrementClick}
        >
          <AiOutlineMinus className="text-xl" />
        </button>
        <p className="text-lg font-normal border-2 w-8 h-7 leading-5 text-center border-gray-300">
          {quantity}
        </p>
        <button
          className="border-2 h-7 w-7 grid place-items-center border-gray-300"
          onClick={handleQuantityIncrementClick}
        >
          <AiOutlinePlus className="text-xl" />
        </button>
      </div>
      <div className="flex-[0.2] text-center justify-center">
        <Price
          direction="column"
          size="sm"
          center
          price={price}
          priceAfterDiscount={priceAfterDiscount}
        />
      </div>
      <div className="flex-[0.2] text-center justify-center">
        <Price
          size="sm"
          direction="column"
          center
          price={
            priceAfterDiscount
              ? priceAfterDiscount * quantity
              : price * quantity
          }
        />
      </div>
    </div>
  );
};

export default HorizontalProductCard;

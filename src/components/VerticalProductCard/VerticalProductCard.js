import { truncateString } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { productAddedToCart } from "../../features/Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Price from "../Price/Price";
import Rates from "../Rates/Rates";
import { useContext } from "react";
import SnackbarContext from "../../context/SnackbarContext";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";

function VerticalProductCard({
  product,
  addToFavoriteLoading,
  handleAddToFavorite,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openSnackbar } = useContext(SnackbarContext);

  const { description, price, priceAfterDiscount, imageUrl, _id, rates } =
    product;

  const productIsFavorite = useSelector((state) =>
    state.user.user?.favoriteProducts.includes(_id)
  );

  const onAddToCartButtonClicked = () => {
    dispatch(productAddedToCart({ productToAdd: product }));
    openSnackbar("Product added to cart.");
  };

  return (
    <div className="rounded-lg shadow-xl hover:shadow-2xl flex flex-col w-56 transition-shadow ease-in-out duration-200">
      <img
        src={imageUrl}
        alt={description}
        className="row-start-1 row-end-1 h-48 w-40 object-contain self-center cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      />
      <p className="h-28 p-3 text-center">{truncateString(description, 90)}</p>
      <hr className="text-pale-white" />
      <Price price={price} priceAfterDiscount={priceAfterDiscount} center />
      <Rates rates={rates} center />
      <div className="flex justify-center gap-5 p-3">
        <button
          className="text-red hover:opacity-80 transition-opacity ease-linear duration-200"
          onClick={() => handleAddToFavorite(_id)}
        >
          {productIsFavorite ? (
            <MdFavorite className="w-6 h-6" />
          ) : (
            <MdOutlineFavoriteBorder className="w-6 h-6 " />
          )}
        </button>
        <button
          className="flex items-center gap-2 p-1 px-2 font-semibold bg-deep-orange text-white rounded-md hover:opacity-80 transition-opacity ease-linear duration-200"
          onClick={onAddToCartButtonClicked}
        >
          Add to cart <BsCartPlus className="inline-block w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default VerticalProductCard;

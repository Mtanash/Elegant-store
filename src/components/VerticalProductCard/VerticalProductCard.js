import { truncateString } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { productAddedToCart } from "../../features/Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Price from "../Price/Price";
import Rates from "../Rates/Rates";
import { useContext } from "react";
import SnackbarContext from "../../context/SnackbarContext";
import { BsCartPlus } from "react-icons/bs";
import IconButton from "../IconButton/IconButton";
import AddToFavoriteButton from "../AddToFavoriteButton/AddToFavoriteButton";

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
        <AddToFavoriteButton
          onButtonClick={() => handleAddToFavorite(_id)}
          productIsFavorite={productIsFavorite}
        />
        <IconButton
          text="Add to cart"
          onButtonClick={onAddToCartButtonClicked}
          Icon={BsCartPlus}
        />
      </div>
    </div>
  );
}

export default VerticalProductCard;

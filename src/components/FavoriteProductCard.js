import { useRemoveProductFromFavoritesMutation } from "../features/api/usersApiSlice";
import { truncateString } from "../utils";
import LoadingButton from "./LoadingButton";
import Price from "./Price";

const FavoriteProductCard = ({ product, loading }) => {
  const {
    _id: productId,
    description,
    price,
    priceAfterDiscount,
    imageUrl,
  } = product;

  const [
    removeProductFromFavorites,
    { isLoading: removeProductFromFavoritesLoading },
  ] = useRemoveProductFromFavoritesMutation();

  return (
    <div className="flex items-center gap-3 w-full md:px-4">
      <img
        className="w-20 h-20 border-2 border-gray-200"
        src={imageUrl}
        alt={description}
      />
      <div className="flex-1">
        <p>{truncateString(description, 30)}</p>
        <Price
          price={priceAfterDiscount ? priceAfterDiscount : price}
          size="md"
        />
      </div>
      <LoadingButton
        text="Remove"
        className="bg-red"
        onButtonClick={() => removeProductFromFavorites({ _id: productId })}
        loading={removeProductFromFavoritesLoading}
      />
    </div>
  );
};

export default FavoriteProductCard;

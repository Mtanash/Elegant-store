import moment from "moment";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productAddedToCart } from "../../features/Cart/cartSlice";
import IconButton from "../IconButton/IconButton";
import AddToFavoriteButton from "../AddToFavoriteButton/AddToFavoriteButton";
import {
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation,
} from "../../features/api/usersApiSlice";
import {
  productAddedToFavorite,
  productRemovedFromFavorite,
} from "../../features/user/userSlice";
import { errorToast, successToast } from "../../toast/toasts";

const ProductDetailsPanel = ({ product, productIsFavorite }) => {
  const dispatch = useDispatch();

  const [productQuantity, setProductQuantity] = useState(1);

  const [loading, setLoading] = useState(false);
  const [addProductToFavorite] = useAddProductToFavoritesMutation();
  const [removeProductFromFavorites] = useRemoveProductFromFavoritesMutation();

  const handleAddToFavorite = async (id) => {
    setLoading(true);
    try {
      if (!productIsFavorite) {
        await addProductToFavorite({ _id: id }).unwrap();
        dispatch(productAddedToFavorite({ _id: id }));
      } else {
        await removeProductFromFavorites({ _id: id }).unwrap();
        dispatch(productRemovedFromFavorite({ _id: id }));
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onAddToCartClick = () => {
    dispatch(
      productAddedToCart({ productToAdd: product, amount: productQuantity })
    );
    successToast("Product added to cart");
  };

  const onUpButtonClicked = () => {
    if (productQuantity === product?.stock) return;
    setProductQuantity(productQuantity + 1);
  };

  const onDownButtonClicked = () => {
    if (productQuantity < 2) return;
    setProductQuantity(productQuantity - 1);
  };

  return (
    <div className="border-[1px] border-solid border-grey border-opacity-20 rounded-md p-2 col-start-1 col-end-2 row-start-3 row-end-4 md:col-start-4 md:col-end-5 md:row-start-1 md:row-end-2 flex flex-col justify-center">
      <p className="font-semibold text-lg mb-1">
        $
        {product?.priceAfterDiscount
          ? product.priceAfterDiscount
          : product.price}
        .00
      </p>
      <p>Delivery: {moment(new Date()).add(2, "days").format("dddd, MMM.D")}</p>
      <p
        className={`font-semibold text-xl ${
          !product?.stock > 0 ? "text-red" : "text-green"
        }`}
      >
        {product?.stock > 0
          ? product.stock < 4
            ? `Only ${product.stock} left in stock - order soon.`
            : "In stock"
          : "Out of stock."}
      </p>
      <AddToFavoriteButton
        onButtonClick={() => handleAddToFavorite(product._id)}
        productIsFavorite={productIsFavorite}
        loading={loading}
      />

      <hr className="text-pale-white" />
      {product?.stock > 0 && (
        <div className="flex flex-col gap-3 my-3 self-center items-center">
          <div className="flex items-center">
            <button
              className="text-pale-red hover:opacity-90 transition-opacity"
              onClick={onUpButtonClicked}
            >
              <BsFillArrowUpSquareFill className="w-8 h-8" />
            </button>
            <input
              className="w-8 h-8 bg-pale-white text-center font-semibold outline-none"
              value={productQuantity}
              readOnly
              type="number"
            />
            <button
              className="text-pale-red hover:opacity-90"
              onClick={onDownButtonClicked}
            >
              <BsFillArrowDownSquareFill className="w-8 h-8" />
            </button>
          </div>
          <IconButton
            text="Add to cart"
            onButtonClick={onAddToCartClick}
            Icon={BsCartPlus}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPanel;

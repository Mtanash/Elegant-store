import { useDispatch, useSelector } from "react-redux";
import {
  productAddedToFavorite,
  productRemovedFromFavorite,
  selectCurrentUser,
} from "../features/user/userSlice";
import useAxios from "./useAxios";
import usePrivateAxios from "./usePrivateAxios";
const useHandleAddToFavorite = () => {
  const [data, loading, error, axiosFetch] = useAxios();
  const privateAxios = usePrivateAxios();

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleAddToFavorite = (productId) => {
    // handle user not logged or signed in
    if (!user) return;
    const productIsFavorite = user?.favoriteProducts.includes(productId);
    if (!productIsFavorite) {
      axiosFetch({
        axiosInstance: privateAxios,
        method: "POST",
        url: "users/addToFavorite",
        requestConfig: { _id: productId },
      }).then(() => {
        dispatch(productAddedToFavorite({ _id: productId }));
      });
    } else {
      axiosFetch({
        axiosInstance: privateAxios,
        method: "POST",
        url: "users/removeFromFavorite",
        requestConfig: { _id: productId },
      }).then(() => {
        dispatch(productRemovedFromFavorite({ _id: productId }));
      });
    }
  };

  return [loading, handleAddToFavorite];
};

export default useHandleAddToFavorite;

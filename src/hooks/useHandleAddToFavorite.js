import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productAddedToFavorite,
  productRemovedFromFavorite,
  selectCurrentUser,
  userSavedToLocalStorage,
} from "../features/user/userSlice";
import useAxios from "./useAxios";
import { privateAxios } from "../api/axios";

const useHandleAddToFavorite = () => {
  const [data, loading, error, axiosFetch] = useAxios();

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  // const [productIsFavorite, setProductIsFavorite] = useState(
  //   user?.favoriteProducts.includes(productId)
  // );

  // useEffect(() => {
  //   if (user?.favoriteProducts.includes(productId)) {
  //     setProductIsFavorite(true);
  //   } else {
  //     setProductIsFavorite(false);
  //   }
  // }, [user, productId]);

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
        dispatch(userSavedToLocalStorage);
      });
    } else {
      axiosFetch({
        axiosInstance: privateAxios,
        method: "POST",
        url: "users/removeFromFavorite",
        requestConfig: { _id: productId },
      }).then(() => {
        dispatch(productRemovedFromFavorite({ _id: productId }));
        dispatch(userSavedToLocalStorage);
      });
    }
  };

  return [loading, handleAddToFavorite];
};

export default useHandleAddToFavorite;

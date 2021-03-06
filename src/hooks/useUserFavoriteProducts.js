import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import useAxios from "./useAxios";
import usePrivateAxios from "./usePrivateAxios";
const useUserFavoriteProducts = () => {
  const privateAxios = usePrivateAxios();
  const user = useSelector(selectCurrentUser);
  const [
    favoriteProducts,
    favoriteProductsLoading,
    favoriteProductsError,
    fetchFavoriteProducts,
  ] = useAxios();

  useEffect(() => {
    fetchFavoriteProducts({
      axiosInstance: privateAxios,
      method: "GET",
      url: "users/me/favoriteProducts",
    });
  }, [user.favoriteProducts]);

  return [favoriteProducts, favoriteProductsLoading, favoriteProductsError];
};

export default useUserFavoriteProducts;

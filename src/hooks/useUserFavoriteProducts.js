import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { getUserFavoriteProducts } from "../api/userApi";

const useUserFavoriteProducts = () => {
  const user = useSelector(selectCurrentUser)?.user;
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;
    const fetchUserProducts = async () => {
      setLoading(true);
      const response = await getUserFavoriteProducts();
      if (response?.data) {
        setFavoriteProducts(response?.data);
      }
      setLoading(false);
    };

    fetchUserProducts();
  }, [user]);

  return [favoriteProducts, loading];
};

export default useUserFavoriteProducts;

import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteProductCard from "../../components/FavoriteProductCard";
import { useGetUserFavoriteProductsQuery } from "../../features/api/usersApiSlice";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";

const FavoriteProductsPage = () => {
  const navigate = useNavigate();

  const {
    data: favoriteProducts,
    isLoading: favoriteProductsLoading,
    error: favoriteProductsError,
  } = useGetUserFavoriteProductsQuery();

  if (favoriteProductsLoading) return <LoadingPage fullHeight />;
  else if (favoriteProductsError) return <ErrorPage fullHeight />;
  else if (favoriteProducts.length === 0)
    return (
      <div className="shadow-special w-full h-full flex flex-col items-center justify-center">
        <h3 className="text-2xl text-center ">No favorite products</h3>
        <p className="text-lg text-center" variant="body2">
          Go to{" "}
          <button
            className="text-blue hover:underline"
            onClick={() => navigate("/")}
          >
            products
          </button>{" "}
          and add some products to favorite.
        </p>
      </div>
    );
  else
    return (
      <div className="shadow-special w-full h-full p-2 flex flex-col gap-3 items-center justify-start">
        <h3 className="font-semibold text-2xl text-center py-4">
          My favorite products
        </h3>
        {favoriteProductsLoading ? (
          <CircularProgress />
        ) : (
          favoriteProducts.map((product) => (
            <FavoriteProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    );
};

export default FavoriteProductsPage;

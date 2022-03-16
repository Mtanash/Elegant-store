import useUserFavoriteProducts from "../../hooks/useUserFavoriteProducts";
import HorizontalProductCard from "../../components/HorizontalProductCard/HorizontalProductCard";

import {
  Stack,
  CircularProgress,
  Typography,
  Link,
  Paper,
  styled,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import LoadingPage from "../LoadingPage/LoadingPage";
import MainPaper from "../../components/custome material ui components/MainPaper";
import ErrorPage from "../ErrorPage/ErrorPage";
import useHandleAddToFavorite from "../../hooks/useHandleAddToFavorite";

const CustomPaper = styled(Paper)(() => ({
  width: "100%",
  height: "100%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const FavoriteProductsPage = () => {
  const navigate = useNavigate();
  const [favoriteProducts, favoriteProductsLoading, favoriteProductsError] =
    useUserFavoriteProducts();
  const [addToFavoriteLoading, handleAddToFavorite] = useHandleAddToFavorite();

  if (favoriteProductsLoading) return <LoadingPage />;
  else if (favoriteProductsError) return <ErrorPage />;
  else if (favoriteProducts.length === 0)
    return (
      <MainPaper elevation={3}>
        <Typography>No favorite products</Typography>
        <Typography variant="body2">
          Go to &nbsp;
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/")}
          >
            products
          </Link>
          &nbsp; and add some products to favorite.
        </Typography>
      </MainPaper>
    );
  else
    return (
      <MainPaper elevation={3}>
        <Stack
          spacing={1}
          sx={{
            width: "80%",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {favoriteProductsLoading ? (
            <CircularProgress sx={{ alignSelf: "center" }} />
          ) : (
            favoriteProducts.map((product) => (
              <HorizontalProductCard
                key={product._id}
                {...product}
                loading={addToFavoriteLoading}
                onRemoveButtonClicked={() => handleAddToFavorite(product._id)}
              />
            ))
          )}
        </Stack>
      </MainPaper>
    );
};

export default FavoriteProductsPage;

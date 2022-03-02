import useUserFavoriteProducts from "../../hooks/useUserFavoriteProducts";
import ProductCard from "../ProductCard/ProductCard";

import {
  Stack,
  CircularProgress,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { removeProductFromFavorite } from "../../features/user/userSlice";

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
  const dispatch = useDispatch();
  const [favoriteProducts, favoriteProductsLoading] = useUserFavoriteProducts();

  const onRemoveButtonClicked = (_id) =>
    dispatch(removeProductFromFavorite({ _id }));

  return !!favoriteProducts.length ? (
    <CustomPaper>
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
            <ProductCard
              key={product._id}
              {...product}
              onRemoveButtonClicked={onRemoveButtonClicked}
            />
          ))
        )}
      </Stack>
    </CustomPaper>
  ) : (
    <CustomPaper elevation={3}>
      <Typography>No favorite products</Typography>
      <Typography variant="body2">
        Go to &nbsp;
        <Link component="button" variant="body2" onClick={() => navigate("/")}>
          products
        </Link>
        &nbsp; and add some products to favorite.
      </Typography>
    </CustomPaper>
  );
};

export default FavoriteProductsPage;

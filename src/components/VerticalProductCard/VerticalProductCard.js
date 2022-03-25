import { truncateString } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { productAddedToCart } from "../../features/Cart/cartSlice";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  CardActionArea,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useNavigate } from "react-router-dom";
import Price from "../Price/Price";
import Rates from "../Rates/Rates";
import { useContext } from "react";
import SnackbarContext from "../../context/SnackbarContext";

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
    <Card
      raised
      sx={{
        margin: "10px",
        width: "250px",
      }}
    >
      <CardActionArea onClick={() => navigate(`/product/${product._id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="white"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            variant="body2"
            gutterBottom
            align="center"
            sx={{
              height: "95px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {truncateString(description)}
          </Typography>
          <Divider sx={{ margin: "5px 0" }} />
          <Price price={price} priceAfterDiscount={priceAfterDiscount} center />
          <Rates rates={rates} center />
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button aria-label="favorite" onClick={() => handleAddToFavorite(_id)}>
          {productIsFavorite ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Button>
        <Button
          size="small"
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
          onClick={onAddToCartButtonClicked}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default VerticalProductCard;

import { useState } from "react";
import { truncateString } from "../../../utils";

import { useDispatch, useSelector } from "react-redux";
import { productAddedToCart } from "../../../features/Cart/cartSlice";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  CardActionArea,
  IconButton,
  Snackbar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useNavigate } from "react-router-dom";
import useHandleAddToFavorite from "../../../hooks/useHandleAddToFavorite";

function Product({ product }) {
  const { description, price, imageUrl, _id } = product;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addToFavoriteLoading, handleAddToFavorite] = useHandleAddToFavorite();
  const productIsFavorite = useSelector((state) =>
    state.user.user?.favoriteProducts.includes(_id)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSnackbar = () => {
    setSnackbarOpen(true);
  };

  const onSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const onAddToCartButtonClicked = () => {
    dispatch(productAddedToCart({ productToAdd: product }));
    openSnackbar();
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onSnackbarClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
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
            <Typography variant="h5" component="div" align="center">
              ${price}.00
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingButton
            aria-label="favorite"
            loading={addToFavoriteLoading}
            onClick={() => handleAddToFavorite(_id)}
          >
            {productIsFavorite ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </LoadingButton>
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
      <Snackbar
        open={snackbarOpen}
        onClose={onSnackbarClose}
        autoHideDuration={4000}
        action={action}
      >
        <Alert onClose={onSnackbarClose} variant="filled" severity="success">
          Product added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Product;

import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { productAddedToCart } from "../../features/Cart/cartSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import useHandleAddToFavorite from "../../hooks/useHandleAddToFavorite";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  Button,
  TextField,
  Rating,
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import { selectCurrentUser } from "../../features/user/userSlice";
import AddReview from "../../components/AddReview/AddReview";
import Reviews from "../../components/Reviews/Reviews";
import Rates from "../../components/Rates/Rates";
import Price from "../../components/Price/Price";

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [productQuantity, setProductQuantity] = useState(1);
  const [productQuantityError, setProductQuantityError] = useState(false);
  const [addToFavoriteLoading, handleAddToFavorite] = useHandleAddToFavorite();
  const [product, productLoading, productError, fetchProduct] = useAxios();
  const productIsFavorite = useSelector((state) =>
    state.user?.user?.favoriteProducts.includes(params.id)
  );
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    fetchProduct({
      axiosInstance: publicAxios,
      method: "get",
      url: `/products/${params.id}`,
    });
  }, []);

  const onAddToCartClick = () => {
    if (productQuantityError || !product?.stock > 0) return;
    dispatch(
      productAddedToCart({ productToAdd: product, amount: productQuantity })
    );
  };

  if (productLoading) return <LoadingPage fullHeight={true} />;
  else if (productError) return <div>Error: {productError}</div>;
  else
    return (
      <Container sx={{ minHeight: "calc(100vh - 124px)" }}>
        <Box sx={{ paddingTop: "1px" }}>
          <Grid container spacing={3} sx={{ marginTop: "0" }}>
            <Grid item xs={3}>
              <img src={product?.imageUrl} alt={product?.description} />
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom variant="body1">
                {product.description}
              </Typography>
              <Rates rates={product.rates} />
              <Divider sx={{ margin: "5px 0" }} />
              <Price
                price={product.price}
                priceAfterDiscount={product?.priceAfterDiscount}
              />
              <Typography variant="caption" gutterBottom>
                All prices include VAT.
              </Typography>
              <Divider sx={{ margin: "5px 0" }} />
              <Typography variant="h6">Details</Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                veniam ipsam cum tenetur quia modi debitis cumque tenetur quia
                modi debitis cumque.
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ padding: "10px" }}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h6">
                  $
                  {product?.priceAfterDiscount
                    ? product.priceAfterDiscount
                    : product.price}
                  .00
                </Typography>
                <Typography variant="body1">
                  Delivery:{" "}
                  {moment(new Date()).add(2, "days").format("dddd, MMM.D")}
                </Typography>
                {!product?.stock > 0 ? (
                  <Typography variant="h6" sx={{ color: "red" }}>
                    Out of stock.
                  </Typography>
                ) : (
                  <Typography variant="h6">In stock.</Typography>
                )}
                {product?.stock > 0 && (
                  <>
                    <TextField
                      sx={{
                        alignSelf: "center",
                        width: "40%",
                        margin: "10px 0",
                      }}
                      value={productQuantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setProductQuantity(value);
                        if (value > product.stock) {
                          setProductQuantityError(true);
                        } else {
                          setProductQuantityError(false);
                        }
                      }}
                      error={productQuantityError}
                      label="Qty"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ alignSelf: "center", margin: "20px 0" }}
                      onClick={onAddToCartClick}
                    >
                      Add to cart
                    </Button>
                  </>
                )}
                <LoadingButton
                  aria-label="favorite"
                  loading={addToFavoriteLoading}
                  onClick={() => handleAddToFavorite(params.id)}
                  variant={productIsFavorite ? "text" : "outlined"}
                  sx={{ alignSelf: "center" }}
                >
                  {productIsFavorite ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <Typography variant="body2">Add to favorite</Typography>
                  )}
                </LoadingButton>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: "5px 0" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom align="center">
                Reviews
              </Typography>
            </Grid>

            <Grid item xs={6}>
              {user ? (
                <AddReview productId={params.id} />
              ) : (
                <Typography variant="h6" align="center">
                  Please login to add a review.
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Reviews productId={params.id} />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ margin: "5px 0" }} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Customers also viewed
              </Typography>
              <Box>Coming soon</Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
};

export default ProductPage;

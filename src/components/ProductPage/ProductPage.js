import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";

import { useDispatch } from "react-redux";
import { productAddedToCart } from "../../features/Cart/cartSlice";
import { fetchProductById } from "../../api/productsApi";

import { useParams } from "react-router-dom";

import moment from "moment";

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

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductById = async (id) => {
      setLoading(true);
      try {
        const response = await fetchProductById(id);
        setProduct(response?.data);
      } catch (err) {
        console.log(err?.response?.data);
      }
      setLoading(false);
    };

    getProductById(params.id);
  }, [params.id]);

  const onAddToCartClick = () => {
    dispatch(
      productAddedToCart({ productToAdd: product, amount: productQuantity })
    );
  };

  if (loading) return <LoadingPage fullHeight={true} />;
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
              <Rating
                size="small"
                name="read-only"
                value={product?.rating}
                readOnly
              />
              <Divider sx={{ margin: "5px 0" }} />
              <Typography variant="h6">Price: ${product.price}.00</Typography>
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
                <Typography variant="h6">${product.price}.00</Typography>
                <Typography variant="body1">
                  Delivery:{" "}
                  {moment(new Date()).add(2, "days").format("dddd, MMM.D")}
                </Typography>
                <Typography variant="h6">In stock.</Typography>
                <Divider sx={{ margin: "5px 0" }} />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ alignSelf: "center", margin: "30px 0" }}
                  onClick={onAddToCartClick}
                >
                  Add to cart
                </Button>
              </Paper>
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

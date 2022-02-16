import { useEffect } from "react";
import Product from "./Product/Product";

import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  selectFilteredProducts,
} from "../../features/products/productsSlice";

import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ProductsComponent from "./ProductsComponent";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const productsLoading = useSelector((state) => state.products.loading);
  const productsError = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (productsError)
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to load products —{" "}
          <strong>Check internet connection and try again later.</strong>
        </Alert>
      </Box>
    );
  else
    return (
      <Box
        id="products"
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        {productsLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ padding: "25px 0" }}
            >
              Latest products
            </Typography>
            <ProductsComponent products={products} />
          </>
        )}
      </Box>
    );
};

export default Products;

import { Typography, Button, Box, Container } from "@mui/material";

import { useEffect } from "react";
import Products from "../../components/Products/Products";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import "../../css/Home/Home.css";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";

const HomePage = () => {
  const [
    featuredProductsData,
    featuredProductsLoading,
    featuredProductsError,
    axiosFetch,
  ] = useAxios();

  useEffect(() => {
    axiosFetch({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products?featured=true`,
    });
  }, []);

  return (
    <main className="home">
      <Box className="main-header">
        <Typography
          sx={{
            width: "60%",
            margin: "10px auto",
            fontWeight: "bold",
          }}
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
        >
          Elegant store
        </Typography>
        <Typography
          sx={{ width: "60%", margin: "0 auto" }}
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
        >
          Best products for best customers
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ marginTop: "40px" }}
          component="a"
          href="#products"
        >
          Shop Now
        </Button>
      </Box>
      <Container>
        {featuredProductsLoading && (
          <LoadingPage customStyles={{ minHeight: "228px" }} />
        )}
        {!featuredProductsLoading && featuredProductsError && <ErrorPage />}
        {!featuredProductsError &&
          !featuredProductsLoading &&
          featuredProductsData?.products && (
            <HomeCarousel products={featuredProductsData.products} />
          )}
        <Products />
      </Container>
    </main>
  );
};

export default HomePage;

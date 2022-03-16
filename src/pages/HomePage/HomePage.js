import {
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect } from "react";
import Products from "../../components/Products/Products";
import Carousel from "react-material-ui-carousel";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useNavigate } from "react-router-dom";
import "../../css/Home/Home.css";

const HomePage = () => {
  const navigate = useNavigate();
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
            <Carousel
              animation="slide"
              NextIcon={<ArrowForwardIosIcon />}
              PrevIcon={<ArrowBackIosNewIcon />}
              sx={{
                "&>div:nth-of-type(1)": {
                  display: "grid",
                  placeItems: "center",
                },
                marginTop: "25px",
              }}
            >
              {featuredProductsData.products.map((product) => (
                <Card raised key={product._id}>
                  <CardActionArea
                    onClick={() => navigate(`/product/${product._id}`)}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrl}
                      alt={product.description}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent sx={{ gridColumn: "2/4" }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        align="center"
                        sx={{
                          height: "95px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        align="center"
                      >
                        ${product.price}.00
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Carousel>
          )}
        <Products />
      </Container>
    </main>
  );
};

export default HomePage;

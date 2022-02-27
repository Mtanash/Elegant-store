// import Filter from "../Filter/Filter";
import Products from "../Products/Products";

import {
  Typography,
  Button,
  Box,
  Paper,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

import "../../css/Home/Home.css";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../../api/productsApi";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const response = await getFeaturedProducts();
        setFeaturedProducts(response?.data.products);
      } catch (err) {
        console.log(err?.response?.data);
      }
      setLoading(false);
    };

    fetchFeaturedProducts();
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
      {/* <Filter /> */}
      <Container>
        <Carousel
          animation="slide"
          NextIcon={<ArrowForwardIosIcon />}
          PrevIcon={<ArrowBackIosNewIcon />}
          sx={{
            "&>div:nth-child(1)": { display: "grid", placeItems: "center" },
            marginTop: "25px",
          }}
        >
          {featuredProducts.map((product) => (
            <Card raised key={product._id}>
              <CardActionArea
                onClick={() => navigate(`/product/${product._id}`)}
                sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
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
                  <Typography variant="body1" component="div" align="center">
                    ${product.price}.00
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Carousel>
        <Products />
      </Container>
    </main>
  );
};

export default Home;

import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Price from "../Price/Price";

const HomeCarousel = ({ products }) => {
  const navigate = useNavigate();
  return (
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
      {products.map((product) => (
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
              <Price
                price={product.price}
                priceAfterDiscount={product.priceAfterDiscount}
                center
              />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;

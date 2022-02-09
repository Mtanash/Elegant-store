// import Filter from "../Filter/Filter";
import Products from "../Products/Products";

import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

import "../../css/Home/Home.css";

const Home = () => {
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
      <Products />
      {/* <Filter /> */}
    </main>
  );
};

export default Home;

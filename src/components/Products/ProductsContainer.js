import { Box } from "@mui/system";
import VerticalProductCard from "../VerticalProductCard/VerticalProductCard";

const ProductsContainer = ({ products = [] }) => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 124px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <VerticalProductCard product={product} key={product._id} />
      ))}
    </Box>
  );
};

export default ProductsContainer;

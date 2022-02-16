import { Box } from "@mui/system";
import Product from "./Product/Product";

const ProductsComponent = ({ products }) => {
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
        <Product product={product} key={product._id} />
      ))}
    </Box>
  );
};

export default ProductsComponent;

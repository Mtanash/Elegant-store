import { Box } from "@mui/system";
import useHandleAddToFavorite from "../../hooks/useHandleAddToFavorite";
import VerticalProductCard from "../VerticalProductCard/VerticalProductCard";

const ProductsContainer = ({ products = [] }) => {
  const [addToFavoriteLoading, handleAddToFavorite] = useHandleAddToFavorite();
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
        <VerticalProductCard
          product={product}
          key={product._id}
          addToFavoriteLoading={addToFavoriteLoading}
          handleAddToFavorite={handleAddToFavorite}
        />
      ))}
    </Box>
  );
};

export default ProductsContainer;

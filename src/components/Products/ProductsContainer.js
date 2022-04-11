import useHandleAddToFavorite from "../../hooks/useHandleAddToFavorite";
import VerticalProductCard from "../VerticalProductCard/VerticalProductCard";

const ProductsContainer = ({ products = [] }) => {
  const [addToFavoriteLoading, handleAddToFavorite] = useHandleAddToFavorite();
  return (
    <section className="flex flex-wrap gap-4 justify-center">
      {products.map((product) => (
        <VerticalProductCard
          product={product}
          key={product._id}
          addToFavoriteLoading={addToFavoriteLoading}
          handleAddToFavorite={handleAddToFavorite}
        />
      ))}
    </section>
  );
};

export default ProductsContainer;

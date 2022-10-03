import VerticalProductCard from "./VerticalProductCard";

const ProductsContainer = ({ products = [] }) => {
  return (
    <section className="flex flex-wrap gap-4 justify-center">
      {products.map((product) => (
        <VerticalProductCard product={product} key={product._id} />
      ))}
    </section>
  );
};

export default ProductsContainer;

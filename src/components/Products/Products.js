import React, { useEffect } from "react";
import Product from "./Product/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  selectFilteredProducts,
} from "../../features/products/productsSlice";
import "../../css/Products/Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="products" id="products">
      {products.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </section>
  );
};

export default Products;

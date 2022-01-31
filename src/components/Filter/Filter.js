import React from "react";
import { sizes, sorts } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  productsFiltered,
  productsSorted,
} from "../../features/products/productsSlice";
import "../../css/Filter/Filter.css";

const Filter = () => {
  const dispatch = useDispatch();

  const productsNumber = useSelector((state) => state.products.products.length);

  const handleSortValueChange = (e) => {
    dispatch(productsSorted(e.target.value));
  };

  const handleFilterValueChange = (e) => {
    dispatch(productsFiltered(e.target.value));
  };

  return (
    <section className="filter">
      <div className="header">
        <h3>Filter</h3>
      </div>
      <div className="body">
        <p className="products-count">Number of products: {productsNumber}</p>
        <div className="filter-part">
          <label htmlFor="filter">Filter</label>
          <select name="filter" id="filter" onChange={handleFilterValueChange}>
            <option value={sizes.all}>All</option>
            <option value={sizes.s}>S</option>
            <option value={sizes.m}>M</option>
            <option value={sizes.l}>L</option>
            <option value={sizes.xl}>XL</option>
            <option value={sizes.xxl}>XXL</option>
          </select>
        </div>
        <div className="order-part">
          <label htmlFor="order">Order</label>
          <select name="order" id="order" onChange={handleSortValueChange}>
            <option value={sorts.latest}>Latest</option>
            <option value={sorts.lowest}>Lowest</option>
            <option value={sorts.highest}>Highest</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filter;

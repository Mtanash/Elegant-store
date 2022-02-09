import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "../../features/products/productsSlice";
import { productAddedToCart } from "../../features/Cart/cartSlice";

import { useParams } from "react-router-dom";

import Rating from "@mui/material/Rating";
import { Button, TextField } from "@mui/material";

import "../../css/ProductPage/ProductPage.css";

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const product = useSelector((state) => selectProductById(state, params.id));

  const { _id, title, description, price, sizes, imageUrl, createdAt, rating } =
    product;

  const onAddToCartClick = () => {
    dispatch(
      productAddedToCart({ productToAdd: product, amount: productQuantity })
    );
  };

  return (
    <section className="product-page">
      <div className="product-img">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <Rating
          className="product-rating"
          size="small"
          name="read-only"
          value={rating}
          readOnly
        />
        <p className="product-price">${price}</p>
        <TextField
          sx={{ width: "120px" }}
          label="Quantity"
          type="number"
          size="small"
          value={productQuantity}
          onChange={(e) => setProductQuantity(parseInt(e.target.value))}
        />
        <Button variant="contained" onClick={onAddToCartClick}>
          Add to cart
        </Button>
      </div>
      <div className="product-description">
        <h4>Description</h4>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default ProductPage;

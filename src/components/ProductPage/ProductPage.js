import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "../../features/products/productsSlice";
import { productAddedToCart } from "../../features/Cart/cartSlice";

import { useParams } from "react-router-dom";

import Rating from "@mui/material/Rating";
import { Button, TextField } from "@mui/material";

import "../../css/ProductPage/ProductPage.css";
import { fetchProductById } from "../../api/productsApi";
import { Box } from "@mui/system";

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductById = async (id) => {
      setLoading(true);
      try {
        const response = await fetchProductById(id);
        setProduct(response?.data);
      } catch (err) {
        console.log(err?.response?.data);
      }
      setLoading(false);
    };

    getProductById(params.id);
  }, [params.id]);

  const onAddToCartClick = () => {
    dispatch(
      productAddedToCart({ productToAdd: product, amount: productQuantity })
    );
  };
  if (loading) return <Box>Loading</Box>;
  else
    return (
      <section className="product-page">
        <div className="product-img">
          <img src={product?.imageUrl} alt={product?.description} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product?.description}</h3>
          <Rating
            className="product-rating"
            size="small"
            name="read-only"
            value={product?.rating}
            readOnly
          />
          <p className="product-price">${product?.price}</p>
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
          <p>{product?.description}</p>
        </div>
      </section>
    );
};

export default ProductPage;

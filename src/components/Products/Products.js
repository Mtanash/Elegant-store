import { useEffect, useRef, useState } from "react";
import Paginate from "../Paginate/Paginate";
import { fetchProducts } from "../../api/productsApi";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Products = () => {
  const productsRef = useRef(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (e, value) => {
    productsRef.current.scrollIntoView();
    setPage(value);
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(page);
        const { products, totalPages } = response?.data;
        setProducts(products);
        setTotalPages(totalPages);
      } catch (err) {
        console.log(err?.response?.data);
      }
      setLoading(false);
    };

    getProducts();
  }, [page, productsRef]);

  return (
    <Box
      ref={productsRef}
      id="products"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ padding: "25px 0" }}
      >
        Latest products
      </Typography>
      <Paginate
        page={page}
        totalPages={totalPages}
        products={products}
        loading={loading}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default Products;

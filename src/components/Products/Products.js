import { useEffect, useRef, useState } from "react";
import Paginate from "../Paginate/Paginate";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";

const Products = () => {
  const productsRef = useRef(null);
  const [productsData, productsLoading, productsError, fetchProducts] =
    useAxios();
  const [page, setPage] = useState(1);

  const handlePageChange = (e, value) => {
    productsRef.current.scrollIntoView();
    setPage(value);
  };

  useEffect(() => {
    fetchProducts({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products?page=${page}`,
    });
  }, [page]);

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
        totalPages={productsData.totalPages}
        products={productsData.products}
        loading={productsLoading}
        error={productsError}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default Products;

import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { getProductsBySearch } from "../../api/productsApi";
import ProductsComponent from "../Products/ProductsComponent";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductsBySearch(searchQuery);
        if (!response?.data) {
          setLoading(false);
          return setError("No match found");
        }
        setProducts(response?.data?.products);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        console.log(err?.response?.data.message);
        setError(err?.response?.data.message);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 124px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  else if (error)
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 124px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error" gutterBottom variant="h2" component="h2">
          {error}
        </Typography>
      </Box>
    );
  else return <ProductsComponent products={products} />;
};

export default SearchPage;

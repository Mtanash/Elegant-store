import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import ProductsContainer from "../../components/Products/ProductsContainer";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Box } from "@mui/material";
import Paginate from "../../components/Paginate/Paginate";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [page, setPage] = useState(1);
  const productsRef = useRef(null);

  const [
    searchResult,
    searchResultLoading,
    searchResultError,
    fetchSearchResult,
  ] = useAxios();

  const handlePageChange = (e, value) => {
    productsRef.current.scrollIntoView();
    setPage(value);
  };

  useEffect(() => {
    fetchSearchResult({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products?search=${searchQuery}`,
    });
  }, [searchQuery]);

  if (searchResultLoading) return <LoadingPage fullHeight={true} />;
  else if (searchResultError) return <ErrorPage />;
  else
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
        <Paginate
          page={page}
          totalPages={searchResult.totalPages}
          products={searchResult.products}
          handlePageChange={handlePageChange}
        />
      </Box>
    );
};

export default SearchPage;

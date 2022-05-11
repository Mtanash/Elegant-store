import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
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
    if (!searchQuery) return;

    fetchSearchResult({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products?search=${searchQuery}`,
    });
  }, [searchQuery]);

  if (searchResultLoading) return <LoadingPage fullHeight />;
  else if (searchResultError) return <ErrorPage />;
  else
    return (
      <div ref={productsRef}>
        <Paginate
          page={page}
          totalPages={searchResult.totalPages}
          products={searchResult.products}
          handlePageChange={handlePageChange}
        />
      </div>
    );
};

export default SearchPage;

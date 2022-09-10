import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import Paginate from "../../components/Paginate/Paginate";
import { useGetProductsBySearchQuery } from "../../features/api/productsApiSlice";

const SearchPage = () => {
  const productsRef = useRef(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [page, setPage] = useState(1);

  const {
    data: searchResult,
    isLoading,
    error,
  } = useGetProductsBySearchQuery(searchQuery, page);

  const handlePageChange = (value) => {
    productsRef.current.scrollIntoView();
    setPage(value);
  };

  if (isLoading) return <LoadingPage fullHeight />;
  else if (error) return <ErrorPage />;
  else
    return (
      <div ref={productsRef}>
        <h3 className="text-center text-3xl p-6">
          Search result for "{searchQuery}"
        </h3>
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

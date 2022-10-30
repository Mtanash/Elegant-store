import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FullPageLayout from "../components/FullPageLayout";
import Paginate from "../components/Paginate";
import { useGetProductsBySearchQuery } from "../features/api/productsApiSlice";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

const SearchPage = () => {
  const navigate = useNavigate();
  const productsRef = useRef(null);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("q");
  const page = searchParams.get("page") || 1;

  const {
    data: searchResult,
    isLoading,
    error,
  } = useGetProductsBySearchQuery({ searchQuery, page });

  const handlePageChange = (value) => {
    productsRef.current.scrollIntoView();
    navigate(`/products/search?q=${searchQuery}&page=${+value}`);
  };

  if (isLoading) return <LoadingPage fullHeight />;
  else if (error) return <ErrorPage />;
  else
    return (
      <div ref={productsRef}>
        {searchResult.products.length > 0 ? (
          <>
            <h3 className="text-center text-3xl p-6">
              Search results for "{searchQuery}"
            </h3>
            <Paginate
              page={+page}
              totalPages={searchResult.totalPages}
              products={searchResult.products}
              handlePageChange={handlePageChange}
            />
          </>
        ) : (
          <FullPageLayout center>
            <h3 className="text-2xl font-semibold">
              No results for "{searchQuery}"
            </h3>
          </FullPageLayout>
        )}
      </div>
    );
};

export default SearchPage;

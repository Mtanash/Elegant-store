import { useRef, useState } from "react";
import { useGetProductsQuery } from "../features/api/productsApiSlice";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import Paginate from "./Paginate";

const Products = () => {
  const productsRef = useRef(null);

  const [page, setPage] = useState(1);
  const { data: productsData, isLoading, error } = useGetProductsQuery(page);

  const handlePageChange = (value) => {
    productsRef.current.scrollIntoView();
    setPage(value);
  };

  if (isLoading) return <LoadingPage fullHeight />;
  else if (error) return <ErrorPage />;
  else
    return (
      <div ref={productsRef} className="my-8">
        <Paginate
          page={page}
          totalPages={productsData.totalPages}
          products={productsData.products}
          handlePageChange={handlePageChange}
        />
      </div>
    );
};

export default Products;

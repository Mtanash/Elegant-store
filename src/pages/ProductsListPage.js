import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import { useGetProductsQuery } from "../features/api/productsApiSlice";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

const ProductsListPage = () => {
  const productsRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const { data: productsData, isLoading, error } = useGetProductsQuery(page);

  const handlePageChange = (value) => {
    productsRef.current.scrollIntoView();
    navigate(`/products?page=${value}`);
  };

  if (isLoading) return <LoadingPage fullHeight />;
  else if (error) return <ErrorPage />;
  else
    return (
      <section ref={productsRef}>
        <h2 className="text-3xl text-center uppercase font-bold my-6">
          All products
        </h2>
        <Paginate
          page={+page}
          totalPages={productsData.totalPages}
          products={productsData.products}
          handlePageChange={handlePageChange}
        />
      </section>
    );
};

export default ProductsListPage;

import { useEffect, useRef, useState } from "react";
import Paginate from "../Paginate/Paginate";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const Products = () => {
  const productsRef = useRef(null);
  const [productsData, productsLoading, productsError, fetchProducts] =
    useAxios();
  const [page, setPage] = useState(1);

  const handlePageChange = (value) => {
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

  if (productsLoading) return <LoadingPage fullHeight={true} />;
  else if (productsError) return <ErrorPage />;
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

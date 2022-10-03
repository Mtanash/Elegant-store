import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FullPageLayout from "../../components/FullPageLayout/FullPageLayout";
import Paginate from "../../components/Paginate/Paginate";
import { useGetProductsByCategoryQuery } from "../../features/api/productsApiSlice";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";

const CategoryPage = () => {
  const { category } = useParams();
  const productsRef = useRef(null);

  const [page, setPage] = useState(1);

  const handlePageChange = (value) => {
    productsRef.current.scrollIntoView();
    setPage(value);
  };

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByCategoryQuery({ category, page });

  if (productsLoading) return <LoadingPage fullHeight />;
  else if (productsError) return <ErrorPage />;
  return (
    <FullPageLayout ref={productsRef}>
      <Paginate
        page={page}
        products={productsData?.products}
        handlePageChange={handlePageChange}
        totalPages={productsData?.totalPages}
      />
    </FullPageLayout>
  );
};

export default CategoryPage;

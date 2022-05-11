import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { publicAxios } from "../../api/axios";
import useAxios from "../../hooks/useAxios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import Paginate from "../../components/Paginate/Paginate";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [page, setPage] = useState(1);

  const [
    categoryResult,
    categoryResultLoading,
    categoryResultError,
    fetchCategoryResult,
  ] = useAxios();

  useEffect(() => {
    if (!category) return;

    fetchCategoryResult({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products?category=${category}`,
    });
  }, [category]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  if (!category)
    return (
      <section className="container mx-auto">No category specified</section>
    );
  else if (categoryResultLoading) return <LoadingPage fullHeight />;
  else if (categoryResultError) return <ErrorPage />;
  else
    return (
      <section className="container mx-auto min-h-[calc(100vh_-_theme(headerAndFooterHeight))]">
        <Paginate
          page={page}
          totalPages={categoryResult.totalPages}
          products={categoryResult.products}
          handlePageChange={handlePageChange}
        />
      </section>
    );
};

export default CategoryPage;

import { useEffect, useRef } from "react";
import Products from "../../components/Products/Products";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";

const HomePage = () => {
  const ProductSectionRef = useRef(null);

  const [
    featuredProductsData,
    featuredProductsLoading,
    featuredProductsError,
    axiosFetch,
  ] = useAxios();

  useEffect(() => {
    axiosFetch({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products?featured=true`,
    });
  }, []);

  const scrollToElement = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="home">
      <div className="flex flex-col justify-center items-center h-[calc(100vh_-_64px)]">
        <h1 className="text-5xl text-center my-4 font-bold">Elegant store</h1>
        <h2 className="text-3xl text-center font-semibold my-8">
          Best products for best customers
        </h2>
        <button
          className="rounded-md inline-block px-8 py-4 bg-deep-orange font-semibold text-center text-white hover:scale-95 transition-transform self-center"
          onClick={() => scrollToElement(ProductSectionRef)}
        >
          Shop Now
        </button>
      </div>
      <div id="products" className="container mx-auto" ref={ProductSectionRef}>
        {featuredProductsLoading && (
          <LoadingPage customStyles={{ minHeight: "228px" }} />
        )}
        {!featuredProductsLoading && featuredProductsError && <ErrorPage />}
        {!featuredProductsError &&
          !featuredProductsLoading &&
          featuredProductsData?.products && (
            <HomeCarousel products={featuredProductsData.products} />
          )}
        <Products />
      </div>
    </main>
  );
};

export default HomePage;

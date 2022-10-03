import { useRef } from "react";
import HomeCarousel from "../components/HomeCarousel";
import Products from "../components/Products";
import { useGetFeaturedProductsQuery } from "../features/api/productsApiSlice";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

const HomePage = () => {
  const ProductSectionRef = useRef(null);
  const {
    data: featuredProductsData,
    isLoading: featuredProductsLoading,
    error: featuredProductsError,
  } = useGetFeaturedProductsQuery();

  const scrollToElement = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  let content;

  if (featuredProductsLoading) {
    content = <LoadingPage customStyles={{ minHeight: "228px" }} />;
  } else if (featuredProductsError) {
    content = <ErrorPage />;
  } else {
    content = <HomeCarousel products={featuredProductsData.products} />;
  }

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
        {content}
        <Products />
      </div>
    </main>
  );
};

export default HomePage;

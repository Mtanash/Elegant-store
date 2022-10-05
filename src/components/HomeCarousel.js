import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import Price from "./Price";

const HomeCarousel = ({ products }) => {
  const navigate = useNavigate();
  return (
    <Carousel
      autoPlay
      dynamicHeight
      emulateTouch
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      showIndicators={false}
      className="px-2 pt-7"
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          className="hidden md:inline-block cursor-pointer z-10 left-3 absolute top-2/4 -translate-y-2/4"
        >
          <BsArrowLeftCircle className="w-8 h-8 text-pale-grey hover:text-deep-blue transition-colors" />
        </button>
      )}
      renderArrowNext={(onClickHandler, hasPrev, label) => (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          className="hidden md:inline-block cursor-pointer z-10 right-3 absolute top-2/4 -translate-y-2/4"
        >
          <BsArrowRightCircle className="w-8 h-8 text-pale-grey hover:text-deep-blue transition-colors" />
        </button>
      )}
    >
      {products.map((product) => (
        <div key={product._id} className="flex gap-4 h-44 sm:h-56">
          <div className="basis-2/4">
            <img
              className="h-full"
              src={product.imageUrl}
              alt={product.description}
            />
          </div>
          <div className="p-2 md:p-4 basis-2/4 h-full  flex flex-col justify-center items-center gap-2">
            <Price
              price={product?.price}
              priceAfterDiscount={product?.priceAfterDiscount}
              center
            />
            <button
              className="inline-block px-2 py-1 md:px-4 md:py-2 bg-deep-orange rounded-md text-white font-semibold text-center hover:scale-95 transition-transform"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              Order now
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;

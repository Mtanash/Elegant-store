import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ProductsContainer from "./ProductsContainer";

const Paginate = ({ products, totalPages, page, handlePageChange }) => {
  const prevPage = () => {
    if (page === 1) return;
    handlePageChange(page - 1);
  };

  const nextPage = () => {
    if (page === totalPages) return;
    handlePageChange(page + 1);
  };

  return (
    <div className="flex flex-col justify-between py-4 gap-7 min-h-[calc(100vh_-_theme(headerAndFooterHeight))]">
      <ProductsContainer products={products} />
      <div className="flex gap-3 self-center justify-center items-center">
        {page !== 1 && (
          <button
            className="p-1 px-4 rounded-md flex items-center justify-center gap-2 text-white bg-deep-blue hover:opacity-95  transition-all ease-in-out duration-150"
            onClick={() => prevPage()}
          >
            <BsArrowLeft className="w-4 h-4" />
            Prev
          </button>
        )}
        <p className="text-center font-semibold">
          Page {page} of {totalPages}
        </p>
        {page !== totalPages && (
          <button
            className="p-1 px-4 rounded-md flex items-center justify-center gap-2 text-white bg-deep-blue hover:opacity-95
              transition-all ease-in-out duration-200"
            onClick={() => nextPage()}
          >
            Next
            <BsArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginate;

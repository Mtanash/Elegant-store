import { Box, Pagination } from "@mui/material";

import ProductsComponent from "../Products/ProductsComponent";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";

const Paginate = ({
  loading,
  error,
  products,
  totalPages,
  page,
  handlePageChange,
}) => {
  if (loading) return <LoadingPage />;
  else if (error) return <ErrorPage />;
  else
    return (
      <Box>
        <ProductsComponent products={products} />
        <Pagination
          sx={{ padding: "15px 0", "& > ul": { justifyContent: "center" } }}
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showLastButton
          size="large"
          color="primary"
          shape="rounded"
        />
      </Box>
    );
};

export default Paginate;

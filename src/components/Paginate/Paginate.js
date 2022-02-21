import { Box, Pagination, CircularProgress } from "@mui/material";

import ProductsComponent from "../Products/ProductsComponent";

const Paginate = ({
  loading,
  products,
  totalPages,
  page,
  handlePageChange,
}) => {
  if (loading)
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 124px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
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

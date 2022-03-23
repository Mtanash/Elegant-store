import { Box, Pagination } from "@mui/material";

import ProductsContainer from "../Products/ProductsContainer";

const Paginate = ({ products, totalPages, page, handlePageChange }) => {
  return (
    <Box>
      <ProductsContainer products={products} />
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

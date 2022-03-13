import { useState, useEffect } from "react";
import { privateAxios } from "../../api/axios";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Rating } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";

const columns = [
  {
    field: "description",
    headerName: "Description",
    description: "Product description",
    width: 250,
  },
  {
    field: "price",
    headerName: "Price",
    description: "Product price",
    width: 100,
  },
  {
    field: "rating",
    headerName: "Rating",
    description: "Product rating",
    width: 150,
    renderCell: ({ value }) => <Rating value={value} readOnly />,
  },
  {
    field: "featured",
    headerName: "Featured",
    width: 150,
  },
];

const ProductsList = () => {
  // const [products, setProducts] = useState();
  const [productsData, productsLoading, productsError, fetchProducts] =
    useAxios();

  useEffect(() => {
    fetchProducts({
      axiosInstance: privateAxios,
      method: "GET",
      url: "products?limit=20",
    });
  }, []);

  if (productsLoading) return <LoadingPage />;
  else if (productsError) return <ErrorPage />;
  else
    return (
      <Paper
        elevation={3}
        sx={{ width: "100%", height: "100%", display: "flex" }}
      >
        <DataGrid
          rows={productsData.products}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection={true}
          onSelectionModelChange={(value) => console.log(value)}
        />
      </Paper>
    );
};

export default ProductsList;

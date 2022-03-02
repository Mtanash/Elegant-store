import { useState, useEffect } from "react";
import { publicAxios } from "../../api/axios";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Rating } from "@mui/material";

const ProductsList = () => {
  const [products, setProducts] = useState();

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

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await publicAxios.get("products?limit=20");
        setProducts(response?.data.products);
      } catch (err) {
        console.log(err?.response?.data);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", height: "100%", display: "flex" }}
    >
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection={true}
        onSelectionModelChange={(value) => console.log(value)}
      />
    </Paper>
  );
};

export default ProductsList;

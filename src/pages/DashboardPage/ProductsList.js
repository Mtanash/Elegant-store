import { Paper, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import CustomModal from "../../components/CustomModal";
import EditProductForm from "../../components/EditProductForm";
import LoadingButton from "../../components/LoadingButton";
import {
  useDeleteProductMutation,
  useGetProductsByLimitQuery,
} from "../../features/api/productsApiSlice";
import { errorToast, successToast } from "../../toast/toasts";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";

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
    field: "rates",
    headerName: "Rating",
    description: "Product rating",
    width: 150,
    renderCell: ({ value: rates }) => {
      const { value: totalRatesValue } = rates.reduce(
        (a, b) => ({
          value: a.value + b.value,
        }),
        { value: 0 }
      );
      const totalRates = rates.length;
      const rate = Math.ceil(totalRatesValue / totalRates);
      return <Rating value={rate} readOnly />;
    },
  },
  {
    field: "featured",
    headerName: "Featured",
    width: 150,
  },
];

const ProductsList = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [ProductToEdit, setProductToEdit] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = useCallback(() => setModalIsOpen(false), []);

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByLimitQuery(20);

  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();

  const handleDeleteProductsClick = async () => {
    try {
      for (let i = 0; i < selectedProducts.length; i++) {
        await deleteProduct(selectedProducts[i]).unwrap();
      }
      successToast("Product deleted successfully");
    } catch (error) {
      console.log(error);
      errorToast(error.message);
    }
  };

  const handleEditProductClick = () => {
    const product = productsData.products.find(
      (product) => product._id === selectedProducts[0]
    );

    if (!product) return console.error("Product not found");

    setProductToEdit(product);

    handleOpenModal();
  };

  if (productsLoading) return <LoadingPage />;
  else if (productsError) return <ErrorPage />;
  else
    return (
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <DataGrid
          rows={productsData.products}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection={true}
          onSelectionModelChange={setSelectedProducts}
        />
        <div className="flex gap-2 mt-6">
          <LoadingButton
            text="Delete"
            loading={deleteProductLoading}
            onButtonClick={handleDeleteProductsClick}
            className="bg-red text-white px-5 py-2 rounded-md disabled:bg-rose-400 disabled:cursor-not-allowed"
            disabled={selectedProducts.length === 0}
          />
          <LoadingButton
            text="Edit"
            // loading={updateProductLoading}
            onButtonClick={handleEditProductClick}
            className="bg-blue text-white px-5 py-2 rounded-md disabled:bg-sky-300 disabled:cursor-not-allowed"
            disabled={
              selectedProducts.length > 1 || selectedProducts.length === 0
            }
          />
        </div>
        <CustomModal open={modalIsOpen} onClose={handleCloseModal}>
          <EditProductForm
            handleCloseModal={handleCloseModal}
            productToEdit={ProductToEdit}
          />
        </CustomModal>
      </Paper>
    );
};

export default ProductsList;

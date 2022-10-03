import { Paper } from "@mui/material";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";
import CustomDialog from "../components/CustomDialog";
import LoadingButton from "../components/LoadingButton";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
} from "../features/api/ordersApiSlice";
import useCustomDialog from "../hooks/useCustomDialog";
import { errorToast } from "../toast/toasts";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

const OrderPageDataRow = ({ title, value }) => {
  return (
    <div className="flex gap-4 items-center">
      <p className="text-xl w-36">{title}:</p>
      <p className="text-xl border-[1px] p-2 flex-1 rounded-sm">{value}</p>
    </div>
  );
};

const OrderPage = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const { customDialogOpen, handleCustomDialogClose, handleCustomDialogOpen } =
    useCustomDialog();

  const {
    data: order,
    isLoading: orderLoading,
    error: orderError,
  } = useGetOrderQuery(orderId);

  const [deleteOrder, { isLoading: deleteOrderLoading }] =
    useDeleteOrderMutation();

  const handleDeleteOrderClick = () => {
    handleCustomDialogOpen();
  };

  const deleteOrderAction = async () => {
    try {
      await deleteOrder(orderId).unwrap();
      navigate(-1);
    } catch (error) {
      console.log(error);
      errorToast(error?.message);
    }
  };

  if (orderError) return <ErrorPage />;
  else if (orderLoading) return <LoadingPage />;
  else
    return (
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <h4 className="text-center text-3xl mt-3 mb-5">Order info</h4>
        <OrderPageDataRow title="Order Number" value={order?._id} />
        <OrderPageDataRow title="First Name" value={order?.info?.firstName} />
        <OrderPageDataRow title="Last Name" value={order?.info?.lastName} />
        <OrderPageDataRow title="Address" value={order?.info?.address} />
        <OrderPageDataRow
          title="Phone Number"
          value={order?.info?.phoneNumber}
        />
        <OrderPageDataRow
          title="Created At"
          value={moment(order?.createdAt).format("DD.MM.YYYY - HH:mm")}
        />
        <OrderPageDataRow
          title="Total Price"
          value={order?.totalPrice?.toFixed(2)}
        />
        <OrderPageDataRow title="State" value={order?.status} />
        <p className="text-xl w-36 mt-4">Order Products:</p>
        <div className="flex gap-2 flex-col">
          {order?.products?.map((productData) => (
            <div className="bg-white rounded-sm p-3 border-2 drop-shadow-sm">
              <p className="text-lg font-semibold">
                Name: {productData.product.description}
              </p>
              <p className="text-lg font-semibold">
                Price: {productData.product.price.toFixed(2)}
              </p>
              <p className="text-lg font-semibold">
                Quantity: {productData.quantity}
              </p>
            </div>
          ))}
        </div>

        <LoadingButton
          text="Delete Order"
          className="bg-red"
          onButtonClick={handleDeleteOrderClick}
        />

        {/* dialog */}
        <CustomDialog
          open={customDialogOpen}
          onClose={handleCustomDialogClose}
          title="Deleting order"
          description={`Are you sure you want to delete order: (${orderId}) ?`}
          loading={deleteOrderLoading}
          action={deleteOrderAction}
        />
      </Paper>
    );
};

export default OrderPage;

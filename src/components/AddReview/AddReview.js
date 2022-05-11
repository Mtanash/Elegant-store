import { Rating } from "@mui/material";
import { useState, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import useAxiosDirect from "../../hooks/useAxiosDirect";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import UserAvatar from "../UserAvatar/UserAvatar";
import { selectCurrentUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import SnackbarContext from "../../context/SnackbarContext";
import LoadingButton from "../LoadingButton/LoadingButton";

const rateLabels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const AddReview = ({ productId }) => {
  const { openSnackbar } = useContext(SnackbarContext);
  const privateAxios = usePrivateAxios();
  const [hover, setHover] = useState(-1);
  const [rate, setRate] = useState(0);
  const [rateDescription, setRateDescription] = useState("");
  const [, addReviewLoading, , addReviewAxiosFetch] = useAxios();

  const [
    userReviewedProduct,
    userReviewedProductLoading,
    userReviewedProductError,
    refetchUserReviewedProduct,
  ] = useAxiosDirect({
    axiosInstance: privateAxios,
    method: "GET",
    url: `products/reviews/userReviewedProduct/${productId}`,
  });

  const user = useSelector(selectCurrentUser);

  const handleAddReview = () => {
    if (rate === 0 || !productId) return;
    addReviewAxiosFetch({
      axiosInstance: privateAxios,
      method: "POST",
      url: "products/reviews",
      requestConfig: {
        text: rateDescription,
        rate,
        productId,
      },
    }).then(() => {
      setRate(0);
      setRateDescription("");
      refetchUserReviewedProduct();
      openSnackbar("Review added successfully");
    });
  };

  if (userReviewedProductLoading) return <LoadingPage />;
  else if (userReviewedProductError) return <ErrorPage />;
  else if (userReviewedProduct) {
    const { owner, rate, text } = userReviewedProduct;
    return (
      <div className="p-2 rounded-md drop-shadow-lg flex flex-col justify-center items-center gap-3">
        <p className="text-lg font-semibold text-center">
          You already reviewed this product.
        </p>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-10 h-10">
            <UserAvatar user={owner} />
          </div>
          <p className="text-center font-semibold">{owner?.name}</p>
        </div>
        <Rating name="product rate" value={rate?.value} readOnly />
        <p className="text-center">{text}</p>
      </div>
    );
  } else
    return (
      <div className="p-2 rounded-md drop-shadow-lg flex flex-col gap-4">
        <p className="text-lg font-semibold text-center">Add a review</p>
        <div className="flex gap-2 items-center justify-center">
          <p>Pick a rate: </p>
          <Rating
            name="product-rating"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {rate !== null && (
            <div className="ml-2 min-w-[62px]">
              {rateLabels[hover !== -1 ? hover : rate]}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="w-10 h-10">
              <UserAvatar user={user} />
            </div>
            <p className="text-center font-semibold">{user?.name}</p>
          </div>

          <textarea
            className=" block w-full px-3 py-1.5 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-60 transition-colors"
            rows={4}
            placeholder="Review description"
            value={rateDescription}
            onChange={(e) => setRateDescription(e.target.value)}
          ></textarea>
        </div>

        <LoadingButton
          text="Submit Review"
          loading={addReviewLoading}
          onButtonClick={handleAddReview}
          color="blue"
        />
      </div>
    );
};

export default AddReview;

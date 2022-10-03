import { Rating } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddReviewMutation,
  useGetUserReviewedProductQuery,
} from "../features/api/productsApiSlice";
import { selectCurrentUser } from "../features/user/userSlice";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import { errorToast, successToast, warningToast } from "../toast/toasts";
import LoadingButton from "./LoadingButton";
import UserAvatar from "./UserAvatar";

const rateLabels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const AddReview = ({ productId }) => {
  const [hover, setHover] = useState(-1);
  const [rate, setRate] = useState(0);
  const [rateDescription, setRateDescription] = useState("");

  const [addReview, { addReviewLoading }] = useAddReviewMutation();

  const {
    data: userReviewedProduct,
    isLoading: userReviewedProductLoading,
    error: userReviewedProductError,
  } = useGetUserReviewedProductQuery(productId);

  const user = useSelector(selectCurrentUser);

  const handleAddReview = async () => {
    if (!productId) return;

    if (!rate) {
      warningToast("Please select a rate!");
      return;
    }

    if (rateDescription.length === 0) {
      warningToast("Please provide a rate description!");
      return;
    }

    const review = {
      text: rateDescription,
      rate,
      productId,
    };
    try {
      await addReview(review);
      setRate(0);
      setRateDescription("");
      successToast("Review added successfully");
    } catch (error) {
      console.log(error);
      errorToast(error.message);
    }
  };

  if (userReviewedProductLoading) return <LoadingPage />;
  else if (userReviewedProductError) return <ErrorPage />;
  else if (userReviewedProduct) {
    const { owner, rate, text } = userReviewedProduct;
    return (
      <div className="p-2 rounded-md drop-shadow-lg flex flex-col justify-center items-center gap-3">
        <p className="text-lg font-semibold text-center">
          Your review on this product.
        </p>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-10 h-10">
            <UserAvatar user={owner} />
          </div>
          <p className="text-center font-semibold">{owner?.name}</p>
        </div>
        <Rating name="product rate" value={rate?.value} readOnly />
        <p className="text-center break-all">{text}</p>
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
            required
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

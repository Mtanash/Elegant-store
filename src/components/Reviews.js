import { Rating } from "@mui/material";
import { useGetProductReviewsQuery } from "../features/api/productsApiSlice";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import UserAvatar from "./UserAvatar";

const Reviews = ({ productId }) => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useGetProductReviewsQuery(productId);

  if (isLoading) return <LoadingPage customStyles={{ height: "500px" }} />;
  else if (error) return <ErrorPage />;
  else
    return (
      <div className="rounded-md bg-white drop-shadow-lg p-2 max-h-[500px] overflow-auto flex flex-col gap-2">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border-[1px] border-solid border-grey border-opacity-20 p-2 flex gap-2"
            >
              <div className="flex flex-col gap-1 items-center w-[85px]">
                <div className="w-12 h-12">
                  <UserAvatar user={review.owner} />
                </div>
                <p>{review.owner.name}</p>
              </div>

              <hr className="w-px h-20 bg-pale-white inline-block" />

              <div>
                <Rating
                  name="product rate"
                  value={review.rate.value}
                  readOnly
                />
                <p className="break-all">{review.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Reviews</p>
        )}
      </div>
    );
};

export default Reviews;

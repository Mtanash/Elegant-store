import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import { Rating } from "@mui/material";
import UserAvatar from "../UserAvatar/UserAvatar";

const Reviews = ({ productId }) => {
  const [reviews, reviewsLoading, reviewsError, fetchReviewsData] = useAxios();

  useEffect(() => {
    fetchReviewsData({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products/reviews/${productId}`,
    });
  }, [productId]);

  if (reviewsLoading) return <LoadingPage customStyles={{ height: "500px" }} />;
  else if (reviewsError) return <ErrorPage />;
  else
    return (
      <div className="rounded-md bg-white drop-shadow-lg p-2 max-h-[500px] overflow-auto flex flex-col gap-2">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <div className="border-[1px] border-solid border-grey border-opacity-20 p-2 flex gap-2">
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
                <p>{review.text}</p>
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

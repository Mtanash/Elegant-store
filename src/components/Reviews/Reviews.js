import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import { Paper, Box, Typography, Divider, Rating } from "@mui/material";
import UserAvatar from "../UserAvatar/UserAvatar";

const Reviews = ({ productId, rerender }) => {
  const [reviews, reviewsLoading, reviewsError, fetchReviewsData] = useAxios();

  useEffect(() => {
    fetchReviewsData({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products/reviews/${productId}`,
    });
  }, [productId, rerender]);

  if (reviewsLoading) return <LoadingPage customStyles={{ height: "500px" }} />;
  else if (reviewsError) return <ErrorPage />;
  else
    return (
      <Paper
        elevation={3}
        sx={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "500px",
          overflow: "auto",
        }}
      >
        {!!reviews.length ? (
          reviews.map((review) => (
            <Paper
              key={review._id}
              variant="outlined"
              sx={{ display: "flex", gap: "10px", padding: "15px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "center",
                  flexBasis: "100px",
                  flexShrink: "0",
                }}
              >
                <UserAvatar user={review.owner} />
                <Typography align="center" variant="subtitle2">
                  {review.owner.name}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Rating
                  name="product rate"
                  value={review.rate.value}
                  readOnly
                />
                <Typography variant="subtitle1">{review.text}</Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="h5" align="center">
            No Reviews
          </Typography>
        )}
      </Paper>
    );
};

export default Reviews;

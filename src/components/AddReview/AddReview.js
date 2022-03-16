import { LoadingButton } from "@mui/lab";
import { Rating, Box, Typography, TextField, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { privateAxios } from "../../api/axios";
import useAxios from "../../hooks/useAxios";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import UserAvatar from "../UserAvatar/UserAvatar";
import { selectCurrentUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

const rateLabels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const AddReview = ({ productId, rerender, setRerender }) => {
  const [hover, setHover] = useState(-1);
  const [rate, setRate] = useState(0);
  const [rateDescription, setRateDescription] = useState("");
  const [data, addReviewLoading, addReviewError, addReviewAxiosFetch] =
    useAxios();
  const [
    userReviewedProduct,
    userReviewedProductLoading,
    userReviewedProductError,
    userReviewedProductAxiosFetch,
  ] = useAxios();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    userReviewedProductAxiosFetch({
      axiosInstance: privateAxios,
      method: "GET",
      url: `products/reviews/userReviewedProduct/${productId}`,
    });
  }, [productId, rerender]);

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
      setRerender(!rerender);
    });
  };

  if (userReviewedProductLoading) return <LoadingPage />;
  else if (userReviewedProductError) return <ErrorPage />;
  else if (userReviewedProduct) {
    const { owner, rate, text } = userReviewedProduct;
    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" align="center">
          You already reviewed this product.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
            flexBasis: "100px",
            flexShrink: "0",
          }}
        >
          <UserAvatar user={owner} />
          <Typography align="center" variant="subtitle2">
            {owner?.name}
          </Typography>
        </Box>
        <Box>
          <Rating name="product rate" value={rate?.value} readOnly />
          <Typography variant="subtitle1" align="center">
            {text}
          </Typography>
        </Box>
      </Paper>
    );
  } else
    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          padding: "15px",
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Add a review
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            alignSelf: "center",
          }}
        >
          <Typography variant="body2">Pick a rate: </Typography>
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
            <Box sx={{ ml: 2, minWidth: "62px" }}>
              {rateLabels[hover !== -1 ? hover : rate]}
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100px",
            }}
          >
            <UserAvatar />
            <Typography align="center" variant="subtitle2">
              {user.name}
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Review description"
            value={rateDescription}
            onChange={(e) => setRateDescription(e.target.value)}
          />
        </Box>
        <LoadingButton
          sx={{ alignSelf: "center" }}
          variant="contained"
          onClick={handleAddReview}
          loading={addReviewLoading}
        >
          Submit Review
        </LoadingButton>
      </Paper>
    );
};

export default AddReview;

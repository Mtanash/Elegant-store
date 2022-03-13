import { Box, LinearProgress, Rating, Typography } from "@mui/material";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";

const Rates = ({ productId, rerender }) => {
  const [
    { productRates, totalRates, totalRatesValue },
    ratesLoading,
    ratesError,
    fetchProductRatesData,
  ] = useAxios();

  useEffect(() => {
    if (!productId) return;
    fetchProductRatesData({
      axiosInstance: publicAxios,
      method: "GET",
      url: `products/rates/${productId}`,
    });
  }, [productId, rerender]);

  if (ratesLoading) return <LinearProgress />;
  if (ratesError) return <p>Failed to load rate</p>;
  else
    return (
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Rating
          size="small"
          name="read-only"
          value={Math.floor(totalRatesValue / totalRates)}
          readOnly
        />
        <Typography>{totalRates}</Typography>
      </Box>
    );
};

export default Rates;

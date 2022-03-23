import { Box, Rating, Typography } from "@mui/material";

const Rates = ({ rates = [], center }) => {
  const { value: totalRatesValue } = rates.reduce(
    (a, b) => ({
      value: a.value + b.value,
    }),
    { value: 0 }
  );
  const totalRates = rates.length;
  const rate = Math.ceil(totalRatesValue / totalRates);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        justifyContent: center ? "center" : "flex-start",
        height: "24px",
      }}
    >
      {rate > 0 && (
        <>
          <Rating size="small" name="read-only" value={rate} readOnly />
          <Typography>{totalRates}</Typography>
        </>
      )}
    </Box>
  );
};

export default Rates;

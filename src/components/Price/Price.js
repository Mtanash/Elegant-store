import { Typography, Box } from "@mui/material";

const Price = ({ price, priceAfterDiscount, center }) => {
  const discount = Math.floor(((price - priceAfterDiscount) / price) * 100);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: center ? "center" : "flex-start",
        height: "55px",
      }}
    >
      {priceAfterDiscount ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: center ? "center" : "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            EGP
            <Typography variant="h6">{priceAfterDiscount}.00</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ textDecoration: "line-through" }} variant="body2">
              EGP {price}.00
            </Typography>
            <Typography
              sx={{ fontSize: ".9rem", fontWeight: "500", color: "green" }}
            >
              {discount}% OFF
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          EGP
          <Typography variant="h6">{price}.00</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Price;

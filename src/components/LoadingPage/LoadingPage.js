import { Box, CircularProgress } from "@mui/material";

const LoadingPage = ({ fullHeight }) => {
  return (
    <Box
      sx={
        fullHeight
          ? {
              minHeight: "calc(100vh - 124px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : null
      }
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;

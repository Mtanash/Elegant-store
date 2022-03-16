import { Box, CircularProgress } from "@mui/material";

const LoadingPage = ({ fullHeight, customStyles = {} }) => {
  return (
    <Box
      sx={[
        fullHeight
          ? {
              minHeight: "calc(100vh - 124px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
        customStyles,
      ]}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;

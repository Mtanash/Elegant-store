import { Alert, AlertTitle, Box } from "@mui/material";

const ErrorPage = ({ fullHeight }) => {
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
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong — <strong>Please try again later!</strong>
      </Alert>
    </Box>
  );
};

export default ErrorPage;

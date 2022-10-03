import { Alert, AlertTitle } from "@mui/material";

const ErrorPage = ({ fullHeight }) => {
  return (
    <section
      className={`${
        fullHeight && "min-h-[calc(100vh_-_theme(headerAndFooterHeight))]"
      } flex justify-center items-center`}
    >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong — <strong>Please try again later!</strong>
      </Alert>
    </section>
  );
};

export default ErrorPage;

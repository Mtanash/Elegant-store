import { CircularProgress } from "@mui/material";

const LoadingPage = ({ fullHeight, className }) => {
  return (
    <section
      className={`${
        fullHeight && "min-h-[calc(100vh_-_theme(headerAndFooterHeight))]"
      } flex justify-center items-center ${className}`}
    >
      <CircularProgress />
    </section>
  );
};

export default LoadingPage;

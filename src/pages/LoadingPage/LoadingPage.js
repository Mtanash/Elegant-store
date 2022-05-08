import { CircularProgress } from "@mui/material";

const LoadingPage = ({ fullHeight }) => {
  return (
    <section
      className={`${
        fullHeight && "min-h-[calc(100vh_-_theme(headerAndFooterHeight))]"
      } flex justify-center items-center`}
    >
      <CircularProgress />
    </section>
  );
};

export default LoadingPage;

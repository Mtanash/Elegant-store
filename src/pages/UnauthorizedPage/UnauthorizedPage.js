import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-[calc(100vh_-_theme(headerAndFooterHeight))] container mx-auto grid place-items-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-7xl font-semibold my-4 text-red text-center">
          Not Authorized
        </p>
        <p className="text-2xl my-4 text-center">
          You do not have access to the requested page.
        </p>
        <button className="text-xl text-blue" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </section>
  );
};

export default UnauthorizedPage;

import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-[calc(100vh_-_theme(headerAndFooterHeight))] container mx-auto grid place-items-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-7xl font-semibold my-4 text-red text-center">
          Page Not Found
        </p>
        <button
          className="px-4 py-2 bg-pale-red text-white rounded-md hover:scale-95 transition-transform"
          onClick={() => navigate("/")}
        >
          Go to homepage
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;

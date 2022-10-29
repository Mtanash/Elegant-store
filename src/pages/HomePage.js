import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div
        className="flex flex-col justify-center items-center h-[calc(100vh_-_64px)]"
        id="hero"
      >
        <h1 className="text-5xl text-center my-4 font-bold uppercase">
          Elegant store
        </h1>
        <h2 className="text-3xl text-center font-semibold my-8 uppercase">
          Best products for best customers
        </h2>
        <button
          className="rounded-md inline-block px-8 py-4 bg-white text-black font-semibold text-center  hover:scale-95 transition-transform self-center shadow-special shadow-deep-orange "
          onClick={() => navigate("/products?page=1")}
        >
          Shop Now
        </button>
      </div>
    </main>
  );
};

export default HomePage;

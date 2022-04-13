import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const AddToFavoriteButton = ({ onButtonClick, productIsFavorite, loading }) => {
  return (
    <button
      className="text-red hover:opacity-80 transition-opacity disabled:cursor-not-allowed self-center w-8 h-8 grid place-items-center"
      disabled={loading !== undefined ? loading : null}
      onClick={onButtonClick}
    >
      {loading ? (
        <svg
          class="animate-spin h-5 w-5 text-red"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : productIsFavorite ? (
        <MdFavorite className="w-6 h-6" />
      ) : (
        <MdOutlineFavoriteBorder className="w-6 h-6 " />
      )}
    </button>
  );
};

export default AddToFavoriteButton;

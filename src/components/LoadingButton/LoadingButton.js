import React from "react";

const LoadingButton = ({ text, loading, onButtonClick, color, submit }) => {
  return (
    <button
      className={`text-white hover:opacity-80 transition-opacity disabled:cursor-not-allowed self-center grid place-items-center py-2 px-6 rounded-md ${
        color ? `bg-${color}` : null
      }`}
      disabled={loading !== undefined ? loading : null}
      onClick={onButtonClick}
      type={`${submit ? "submit" : "button"}`}
    >
      {loading ? (
        <svg
          class="animate-spin h-5 w-5 text-white"
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
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;

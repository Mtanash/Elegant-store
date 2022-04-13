const IconButton = ({ text, onButtonClick, Icon }) => {
  return (
    <button
      className="h-8 flex items-center gap-2 p-1 px-2 font-semibold bg-deep-orange text-white rounded-md hover:opacity-80 transition-opacity"
      onClick={onButtonClick}
    >
      {text} <Icon className="inline-block w-6 h-6" />
    </button>
  );
};

export default IconButton;

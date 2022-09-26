const IconButton = ({ text, onButtonClick, Icon, alignCenter, color }) => {
  return (
    <button
      className={`h-8 flex items-center gap-2 py-2 px-4 font-semibold ${
        color ? `bg-${color}` : "bg-deep-orange"
      } text-white rounded-md hover:scale-95 transition-transform ${
        alignCenter && "self-center"
      }`}
      onClick={onButtonClick}
    >
      {text && text} <Icon className="inline-block w-6 h-6" />
    </button>
  );
};

export default IconButton;

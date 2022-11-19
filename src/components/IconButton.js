const IconButton = ({
  text,
  onButtonClick,
  Icon,
  alignCenter,
  color,
  rounded,
}) => {
  return (
    <button
      className={`${
        color ? `bg-${color}` : "bg-deep-orange"
      } text-white rounded-md hover:scale-95 transition-transform ${
        alignCenter && "self-center"
      } ${
        rounded ? "rounded-full w-[40px] h-[40px] p-0" : "h-8 py-2 px-4"
      }  grid place-content-center gap-2  font-semibold`}
      onClick={onButtonClick}
    >
      {text && text} <Icon className="inline-block w-6 h-6" />
    </button>
  );
};

export default IconButton;

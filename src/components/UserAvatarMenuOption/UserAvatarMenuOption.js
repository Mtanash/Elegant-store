const UserAvatarMenuOption = ({ text, Icon, onOptionButtonClicked }) => {
  return (
    <button
      className="flex gap-3 items-center justify-center transition-colors ease-in-out duration-200 hover:bg-pale-white"
      onClick={onOptionButtonClicked}
    >
      <Icon className="ml-3.5 w-5 h-5" />
      <span className="pr-3.5 py-2 font-semibold text-grey hover:text-deep-blue inline-block rounded-md  ">
        {text}
      </span>
    </button>
  );
};

export default UserAvatarMenuOption;

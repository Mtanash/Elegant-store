import LoadingButton from "./LoadingButton";

const ProfilePictureForm = ({ onInputFileChange, isLoading, updateAvatar }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-2 mt-6">
      <div className="flex gap-2 items-center">
        <label className="cursor-pointer font-semibold" htmlFor="image">
          Profile picture
        </label>
        <input
          type="file"
          id="image"
          onChange={onInputFileChange}
          accept=".png, .jpeg, .jpg"
          required
        />
      </div>
      <LoadingButton
        loading={isLoading}
        text="Save"
        className="bg-deep-orange"
        onButtonClick={updateAvatar}
      />
    </div>
  );
};

export default ProfilePictureForm;

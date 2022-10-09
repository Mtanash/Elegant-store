import { useCallback, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import ProfilePictureForm from "../../components/ProfilePictureForm";
import UserAvatar from "../../components/UserAvatar";
import { useUpdateUserAvatarMutation } from "../../features/api/usersApiSlice";
import {
  selectCurrentUser,
  userDataRefreshed,
} from "../../features/user/userSlice";
import useErrorHandler from "../../hooks/useErrorHandler";

const ProfileInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const { handleError } = useErrorHandler();

  const [updateUserAvatar, { isLoading }] = useUpdateUserAvatarMutation();

  const handleOpen = () => {
    if (!user) return navigate("/auth");
    setOpen(true);
  };

  const handleClose = useCallback(() => setOpen(false), []);

  const onInputFileChange = useCallback((e) => {
    const uncompressedFile = e.target.files[0];
    Resizer.imageFileResizer(
      uncompressedFile,
      250,
      200,
      "PNG",
      100,
      0,
      (uri) => {
        setFile(uri);
      },
      "file",
      250,
      200
    );
  }, []);

  const updateAvatar = useCallback(async () => {
    const avatarFormData = new FormData();

    avatarFormData.append("avatar", file);

    try {
      const response = await updateUserAvatar(avatarFormData).unwrap();
      dispatch(userDataRefreshed({ ...user, avatar: response.data }));
      handleClose();
    } catch (error) {
      handleError(error);
    }
  }, [dispatch, file, handleClose, handleError, updateUserAvatar, user]);

  return (
    <div className="shadow-special w-full h-full flex flex-col gap-8 items-center px-2 py-4">
      <h3 className="text-center font-semibold text-3xl">{user?.name}</h3>
      <div className="w-32 h-32 flex items-center justify-center">
        <UserAvatar user={user} />
      </div>
      <button
        className="px-4 py-2 bg-white text-deep-blue border-2 border-deep-blue outline-none rounded-md text-lg hover:text-white hover:bg-deep-blue transition-colors font-medium"
        onClick={handleOpen}
      >
        Update profile picture
      </button>
      <p className="text-sm text-gray-500">
        Hint: if you can not see the new profile image, please refresh the page.
      </p>

      {/* Modal */}
      <CustomModal
        open={open}
        onClose={handleClose}
        title="Change profile picture"
      >
        <ProfilePictureForm
          isLoading={isLoading}
          onInputFileChange={onInputFileChange}
          updateAvatar={updateAvatar}
        />
      </CustomModal>
    </div>
  );
};

export default ProfileInfoPage;

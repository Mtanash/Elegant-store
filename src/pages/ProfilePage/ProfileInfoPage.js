import { Modal } from "@mui/material";

import { useState } from "react";
import UserAvatar from "../../components/UserAvatar/UserAvatar";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  userDataRefreshed,
} from "../../features/user/userSlice";

import Resizer from "react-image-file-resizer";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const ProfileInfoPage = () => {
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    if (!user) return navigate("/auth");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onInputFileChange = (e) => {
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
        console.log(file);
      },
      "base64",
      250,
      200
    );
  };

  const updateAvatar = () => {
    setLoading(true);
    privateAxios.post("/users/me/avatar", { avatar: file }).then((response) => {
      dispatch(userDataRefreshed({ ...user, avatar: file }));
      setLoading(false);
      handleClose();
    });
  };

  return (
    <div className="shadow-special w-full h-full flex flex-col gap-4 items-center px-2 py-4">
      <h3 className="text-center font-semibold text-3xl">{user?.name}</h3>
      <div className="w-32 h-32">
        <UserAvatar user={user} />
      </div>
      <button
        className="px-4 py-2 bg-white text-deep-blue border-2 border-deep-blue outline-none rounded-md text-lg hover:text-white hover:bg-deep-blue transition-colors font-medium"
        onClick={handleOpen}
      >
        Update profile picture
      </button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="pick-file-modal"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white px-2 py-8 flex flex-col items-center gap-6">
          <button
            className="bg-red text-white w-9 h-9 rounded-md font-semibold hover:bg-deep-red transition-colors absolute top-3 right-3"
            onClick={handleClose}
          >
            &#10005;
          </button>
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
            loading={loading}
            text="Save"
            color="deep-orange"
            onButtonClick={updateAvatar}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProfileInfoPage;

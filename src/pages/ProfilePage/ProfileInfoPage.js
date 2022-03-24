import { Paper, Button, Typography, Modal, Box, Input } from "@mui/material";
import { LoadingButton } from "@mui/lab";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
};

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
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <UserAvatar user={user} styles={{ width: "150px", height: "150px" }} />
      <Button variant="outlined" size="small" onClick={handleOpen}>
        Update profile picture
      </Button>
      <Typography variant="h4" align="center" gutterBottom mt="15px">
        {user?.name}
      </Typography>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="pick-file-modal"
      >
        <Box sx={style}>
          <Input
            type="file"
            inputProps={{ accept: ".png, .jpeg, .jpg" }}
            required
            onChange={onInputFileChange}
          />
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={updateAvatar}
          >
            Save
          </LoadingButton>
        </Box>
      </Modal>
    </Paper>
  );
};

export default ProfileInfoPage;

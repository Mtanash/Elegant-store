import { Paper, Button, Typography, Modal, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useState } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateUserAvatar,
} from "../../features/user/userSlice";

import FileBase from "react-file-base64";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleOpen = () => {
    if (!user) return navigate("/auth");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const updateAvatar = () => {
    setLoading(true);

    dispatch(updateUserAvatar({ avatar }))
      .unwrap()
      .then((res) => {
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
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setAvatar(base64)}
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

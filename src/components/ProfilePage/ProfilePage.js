import React, { useState } from "react";
import FileBase from "react-file-base64";
import { Avatar, Button, Container, Typography, Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  updateUserAvatar,
} from "../../features/user/userSlice";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

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

const ProfilePage = () => {
  const user = useSelector(selectCurrentUser)?.user;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
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
    <Container
      maxWidth="lg"
      sx={{ minHeight: "calc(100vh - 124px)", paddingTop: "40px" }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Avatar
          size="large"
          sx={{ width: "100px", height: "100px", margin: "auto" }}
          src={user ? user?.avatar : null}
          alt={user?.name}
        />
        <Button variant="outlined" size="small" onClick={handleOpen}>
          Update profile picture
        </Button>
        <Typography variant="h3" align="center" gutterBottom mt="15px">
          {user?.name}
        </Typography>
      </Box>

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
    </Container>
  );
};

export default ProfilePage;

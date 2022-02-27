import { Avatar } from "@mui/material";

const UserAvatar = ({ user, styles }) => {
  return user?.avatar ? (
    <Avatar src={user?.avatar} size="small" sx={styles} />
  ) : (
    <Avatar size="small" sx={styles}>
      {user?.name[0] || null}
    </Avatar>
  );
};

export default UserAvatar;

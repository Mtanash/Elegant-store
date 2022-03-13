import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";

const UserAvatar = ({ user, styles }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!user) user = currentUser;

  return user?.avatar ? (
    <Avatar src={user?.avatar} size="small" sx={styles} />
  ) : (
    <Avatar size="small" sx={styles}>
      {user?.name[0] || null}
    </Avatar>
  );
};

export default UserAvatar;

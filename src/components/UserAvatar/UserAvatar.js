import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";

const UserAvatar = ({ user, styles }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!user) user = currentUser;

  if (!user)
    return (
      <img
        src="/images/avatar_placeholder.png"
        alt="user avatar"
        className="rounded-full object-cover"
      />
    );
  else if (!user?.avatar)
    return (
      <img src="" alt={user?.name} className="rounded-full object-cover">
        {user?.name[0]?.toUpperCase()}
      </img>
    );
  else
    return (
      <img
        src={user?.avatar ? user.avatar : "/images/avatar_placeholder.png"}
        alt={user?.name}
        className="rounded-full object-cover"
      />
    );
};

export default UserAvatar;

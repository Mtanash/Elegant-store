import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";

const UserAvatar = ({ user }) => {
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
      <div className="rounded-full flex justify-center items-center bg-pale-grey h-10 w-10 text-white text-xl">
        <p>{user.name[0].toUpperCase()}</p>
      </div>
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

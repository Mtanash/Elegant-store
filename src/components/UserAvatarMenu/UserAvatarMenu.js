import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  userLoggedOut,
} from "../../features/user/userSlice";
import UserAvatar from "../UserAvatar/UserAvatar";
import { FiLogIn } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { MdSpaceDashboard } from "react-icons/md";
import UserAvatarMenuOption from "../UserAvatarMenuOption/UserAvatarMenuOption";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../features/api/usersApiSlice";

const UserAvatarMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const userAvatarMenuRef = useRef(null);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const closeUserMenu = () => setShowUserMenu(false);

  const logout = () => {
    logoutUser()
      .unwrap()
      .then(() => {
        dispatch(userLoggedOut());
        closeUserMenu();
      });
  };

  useEffect(() => {
    if (!showUserMenu) return;

    const handleCloseUserAvatarMenuOnClickAway = (e) => {
      if (e.target !== userAvatarMenuRef.current) {
        // close user avatar menu
        closeUserMenu(false);
      }
    };

    document.addEventListener("click", handleCloseUserAvatarMenuOnClickAway);

    return () => {
      document.removeEventListener(
        "click",
        handleCloseUserAvatarMenuOnClickAway
      );
    };
  });

  return (
    <div className="relative">
      {/* avatar */}
      <div className="w-10 h-10 cursor-pointer" onClick={toggleUserMenu}>
        <UserAvatar user={user} />
      </div>
      {/* menu */}
      <div
        ref={userAvatarMenuRef}
        className={`py-2 bg-white absolute flex flex-col justify-center items-start right-0 top-[150%] rounded-md transition-all duration-400 ease-linear shadow-lg hover:shadow-xl ${
          showUserMenu ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      >
        {user ? (
          <>
            <UserAvatarMenuOption
              text="Profile"
              Icon={ImProfile}
              onOptionButtonClicked={() => {
                navigate("/me");
                closeUserMenu();
              }}
            />
            {user?.role === "admin" && (
              <UserAvatarMenuOption
                text="Dashboard"
                Icon={MdSpaceDashboard}
                onOptionButtonClicked={() => {
                  navigate("/dashboard");
                  closeUserMenu();
                }}
              />
            )}
            <UserAvatarMenuOption
              text="Logout"
              Icon={CgLogOut}
              onOptionButtonClicked={() => {
                logout();
              }}
            />
          </>
        ) : (
          <>
            <UserAvatarMenuOption
              text="Login"
              Icon={FiLogIn}
              onOptionButtonClicked={() => {
                navigate("/auth");
                closeUserMenu();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserAvatarMenu;

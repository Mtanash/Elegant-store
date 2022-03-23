import { publicAxios } from "../api/axios";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/user/userSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await publicAxios.get("/users/logout", { withCredentials: true });
      dispatch(userLoggedOut());
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;

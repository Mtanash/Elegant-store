import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../features/user/userSlice";

const RequireAuth = ({ allowedRoles }) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return user?.role && allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;

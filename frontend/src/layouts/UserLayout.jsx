import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/header/Navbar";

const UserLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  return !roles.length || roles.includes(user?.role) ? (
    <div>
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default UserLayout;

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const UserLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  return !roles.length || roles.includes(user?.role) ? (
    <div>
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserLayout;

UserLayout.propTypes = {
  roles: PropTypes.array,
};

import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const UserLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  return !roles.length || roles.includes(user?.role) ? (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserLayout;

UserLayout.propTypes = {
  roles: PropTypes.array,
};

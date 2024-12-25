import PropTypes from "prop-types";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ handleLogout, showSidebar, handleSidebarHide, props }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <Offcanvas
      placement="end"
      show={showSidebar}
      onHide={handleSidebarHide}
      {...props}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Bangla Literature</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={2} className="mb-4">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/api" className="nav-link">
            Api
          </NavLink>
          <NavLink to="/examples" className="nav-link">
            Examples
          </NavLink>
          <NavLink to="/blog" className="nav-link">
            Blog
          </NavLink>
        </Stack>

        {user ? (
          <Stack className="py-3" gap={2}>
            <NavLink to="/profile" className="btn btn-outline-primary">
              Profile
            </NavLink>

            <Button onClick={handleLogout} variant="nav-link">
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack gap={2} className="py-3">
            <NavLink to="/register" className="btn btn-outline-primary">
              Register
            </NavLink>
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
          </Stack>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Sidebar;

Sidebar.propTypes = {
  handleLogout: PropTypes.func,
  handleSidebarHide: PropTypes.func,
  showSidebar: PropTypes.bool,
  props: PropTypes.any,
};

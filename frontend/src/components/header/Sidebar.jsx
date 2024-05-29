import { Button, Offcanvas, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  user,
  handleLogout,
  showSidebar,
  handleSidebarHide,
  props,
}) => {
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
            <NavLink to="/user/profile" className="btn btn-outline-primary">
              Profile
            </NavLink>

            <Button onClick={handleLogout} variant="nav-link">
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack className="py-3">
            <NavLink to="/register" className="btn btn-outline-primary">
              Register
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </Stack>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Sidebar;

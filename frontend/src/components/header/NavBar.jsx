import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { Button, Stack } from "react-bootstrap";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Bangla Literature
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
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

            {user ? (
              <Stack direction="horizontal" gap={2}>
                <NavLink to="/user/profile" className="btn btn-primary">
                  Profile
                </NavLink>

                <Button onClick={handleLogout} variant="outline-primary">
                  Logout
                </Button>
              </Stack>
            ) : (
              <Stack direction="horizontal">
                <NavLink to="/register" className="btn btn-outline-primary">
                  Register
                </NavLink>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </Stack>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;

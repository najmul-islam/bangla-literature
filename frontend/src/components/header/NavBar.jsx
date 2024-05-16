import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  // console.log(user);
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

            {!user && (
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            )}

            {!user && (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}

            {user && (
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <NavLink to="/user/profile" className="dropdown-item">
                  Profile
                </NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;

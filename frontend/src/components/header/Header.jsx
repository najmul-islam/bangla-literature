import { useState } from "react";
import { Button, Col, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { TbAlignRight } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import Sidebar from "./Sidebar";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSidebarShow = () => {
    setShowSidebar(true);
  };

  const handleSidebarHide = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container>
          <Col xs={9} lg={3}>
            <NavLink to="/" className="navbar-brand py-2">
              <img
                src="/bangla-literature.png"
                alt="bangla literature"
                height={35}
              />
            </NavLink>
          </Col>
          <Col xs={6} className="d-none d-lg-flex justify-content-center ">
            <Nav className="">
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
            </Nav>
          </Col>
          <Col xs={3} className="d-none d-lg-flex d-flex justify-content-end">
            <Nav className="">
              {user ? (
                <Stack direction="horizontal" gap={2}>
                  <NavLink
                    to="/user/profile"
                    className="btn btn-outline-primary"
                  >
                    Profile
                  </NavLink>

                  <Button onClick={handleLogout} variant="nav-link">
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
          </Col>
          <Col xs={3} className="d-flex d-lg-none d-flex justify-content-end">
            <Button variant="outline" onClick={handleSidebarShow}>
              <TbAlignRight className="fs-2" />
            </Button>
          </Col>
        </Container>
      </Navbar>

      <Sidebar
        user={user}
        handleLogout={handleLogout}
        showSidebar={showSidebar}
        handleSidebarShow={handleSidebarShow}
        handleSidebarHide={handleSidebarHide}
      />
    </>
  );
};
export default Header;

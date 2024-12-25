import { useState } from "react";
import { Button, Col, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { TbAlignRight } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { userAction } from "../../features/user/userSlice";
import Sidebar from "./Sidebar";

const Header = () => {
  // const { data: profile, isLoading, isError, error } = useProfileQuery();
  const { user } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(userAction(undefined));
  };

  const handleSidebarShow = () => {
    setShowSidebar(true);
  };

  const handleSidebarHide = () => {
    setShowSidebar(false);
  };

  // if (isLoading) return <Loading />;
  // if (isError) return <Error error={error} />;
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
            <Nav>
              {user ? (
                <Stack direction="horizontal" gap={2}>
                  {user?.role === "moderator" ? (
                    <NavLink to="/dashboard" className="nav-link fs-4">
                      <MdOutlineDashboardCustomize />
                    </NavLink>
                  ) : null}
                  <NavLink to="/profile" className="nav-link fs-4">
                    <FaUserCircle />
                  </NavLink>
                  <Button
                    onClick={handleLogout}
                    variant="warning"
                    className="rounded-pill"
                  >
                    Logout
                  </Button>
                </Stack>
              ) : (
                <Stack direction="horizontal" gap={2}>
                  <NavLink
                    to="/register"
                    className="btn btn-outline-primary rounded-pill px-3"
                  >
                    Register
                  </NavLink>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </Stack>
              )}
            </Nav>
          </Col>
          <Col
            xs={3}
            className="d-flex d-lg-none d-flex justify-content-end align-items-center"
          >
            {user?.role === "moderator" ? (
              <NavLink to="/dashboard" className="nav-link fs-4">
                <MdOutlineDashboardCustomize />
              </NavLink>
            ) : null}
            <Button variant="outline" onClick={handleSidebarShow}>
              <TbAlignRight className="fs-2" />
            </Button>
          </Col>
        </Container>
      </Navbar>

      <Sidebar
        handleLogout={handleLogout}
        showSidebar={showSidebar}
        handleSidebarShow={handleSidebarShow}
        handleSidebarHide={handleSidebarHide}
      />
    </>
  );
};
export default Header;

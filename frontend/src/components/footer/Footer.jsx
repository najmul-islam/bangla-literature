import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container className="">
        <Row className="py-5 justify-content-center">
          <Col lg={3} className="mb-4 mb-lg-0">
            <h4 className="">Get Started</h4>
            <Navbar variant="dark">
              <Nav className="flex-column bg-dark">
                <NavLink to="/register" className="nav-link ps-0">
                  Register
                </NavLink>
                <NavLink to="/login" className="nav-link ps-0">
                  Login
                </NavLink>
                <NavLink to="/api" className="nav-link ps-0">
                  Api&apos;s
                </NavLink>
                <NavLink to="/blog" className="nav-link ps-0">
                  Blog
                </NavLink>
                <NavLink to="/examples" className="nav-link ps-0">
                  Examples
                </NavLink>
              </Nav>
            </Navbar>
          </Col>
          <Col lg={3} className="mb-4 mb-lg-0">
            <h4>About</h4>
            <Navbar variant="dark">
              <Nav className="flex-column bg-dark ">
                <NavLink to="/contact" className="nav-link ps-0">
                  Contact Us
                </NavLink>
                <NavLink to="/privacy" className="nav-link ps-0">
                  Privacy Policy
                </NavLink>
                <NavLink to="/terms" className="nav-link ps-0">
                  Terms of Service
                </NavLink>
                <NavLink to="/faq" className="nav-link ps-0">
                  FAQ
                </NavLink>
              </Nav>
            </Navbar>
          </Col>
          <Col lg={3} className="mb-4 mb-lg-0">
            <h4>Connect With Us</h4>
          </Col>
        </Row>

        <Row className="text-center">
          <p>© 2023 Bangla Literature. All rights reserved.</p>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;

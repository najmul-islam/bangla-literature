import { Col, Container, Row, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const HomePage = () => {
  return (
    <section className="bg-light">
      <Container>
        <Row className="py-5">
          <Col>
            <h1>Develop Genuine Applications with Authentic Data</h1>
            <h6>Explore 87 distinct APIs to empower your upcoming projects.</h6>
            <Stack direction="horizontal" gap={2} className="py-4">
              <NavLink to="/register" className="btn btn-primary">
                Get free api&apos;s key
              </NavLink>
              <NavLink to="/api" className="btn btn-outline-info">
                Browse api&apos;s
              </NavLink>
            </Stack>
          </Col>
          <Col></Col>
          {/* <Col>
            <code>
              <pre>
                {`
[
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "pages": 180,
    "genre": "Fiction",
    "language": "English",
    "publisher": "Charles Scribner's Sons",
    "rating": 4.4,
    "price": 10.99
  }
]`}
              </pre>
            </code>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
};
export default HomePage;

import { Container } from "react-bootstrap";
import Register from "../../components/auth/Register";

const RegisterPage = () => {
  return (
    <Container className="py-5" style={{ width: "400px" }}>
      <Register />
    </Container>
  );
};
export default RegisterPage;

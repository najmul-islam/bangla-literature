import { Container } from "react-bootstrap";
import Login from "../../components/auth/Login";

const LoginPage = () => {
  return (
    <Container className="py-5" style={{ width: "400px" }}>
      <Login />
    </Container>
  );
};
export default LoginPage;

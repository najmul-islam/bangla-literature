import { Container } from "react-bootstrap";
import ForgotPassword from "../../components/auth/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <Container className="py-5" style={{ width: "400px" }}>
      <ForgotPassword />
    </Container>
  );
};
export default ForgotPasswordPage;

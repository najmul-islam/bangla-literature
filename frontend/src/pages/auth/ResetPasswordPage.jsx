import { Container } from "react-bootstrap";
import ResetPassword from "../../components/auth/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <Container className="py-5" style={{ width: "400px" }}>
      <ResetPassword />
    </Container>
  );
};
export default ResetPasswordPage;

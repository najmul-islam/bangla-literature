import { Container } from "react-bootstrap";
import VerifyEmail from "../../components/auth/VerifyEmail";

const VerifyEmailPage = () => {
  return (
    <Container className="py-5" style={{ width: "400px" }}>
      <VerifyEmail />
    </Container>
  );
};
export default VerifyEmailPage;

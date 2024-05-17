import { Container } from "react-bootstrap";
import ChangePassword from "../../components/user/ChangePassword";

const ChangePasswordPage = () => {
  return (
    <Container className="py-5" style={{ width: "400px" }}>
      <ChangePassword />
    </Container>
  );
};
export default ChangePasswordPage;

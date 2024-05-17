import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const Error = ({ message }) => {
  return <Alert variant="danger">{message}</Alert>;
};
export default Error;

Error.propTypes = {
  message: PropTypes.string,
};

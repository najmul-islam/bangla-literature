import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const Error = ({ error }) => {
  console.log(error);
  return <Alert variant="danger">{error?.data?.message}</Alert>;
};
export default Error;

Error.propTypes = {
  error: PropTypes.string,
};

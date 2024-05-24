import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Spinner animation="grow" />;
    </div>
  );
};
export default Loading;

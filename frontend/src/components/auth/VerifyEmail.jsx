import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useVerifyEmailQuery } from "../../features/auth/authApi";
import { Alert } from "react-bootstrap";

const VerifyEmail = () => {
  const [query, setQuery] = useSearchParams();
  const { data, isLoading, isError, error } = useVerifyEmailQuery(
    query.get("verifyToken")
  );

  console.log("query", query.get("verifyToken"));
  console.log("data", data);
  console.log("error", error);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {isError && (
        <Alert variant="danger py-3 text-center">{error.data.message}</Alert>
      )}

      {data?.isVerified && (
        <Alert variant="primary py-3">
          Email verify successful. login{" "}
          <NavLink to="/login" className="nav-link">
            here
          </NavLink>{" "}
          with your email and password link.
        </Alert>
      )}
    </div>
  );
};
export default VerifyEmail;

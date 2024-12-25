import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailQuery } from "../../features/auth/authApi";

const VerifyEmail = () => {
  const [query, setQuery] = useSearchParams();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError, error } = useVerifyEmailQuery(
    query.get("verifyToken")
  );

  useEffect(() => {
    if (user) {
      navigate("/user/profile");
    }
  }, [user, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return (
    !user && (
      <div>
        {isError && (
          <Alert variant="danger py-3 text-center">{error.data.message}</Alert>
        )}

        {data?.isVerified && (
          <Alert variant="primary py-3">
            Email verify successful.
            <NavLink to="/login" className="mx-2 fw-bold">
              login here
            </NavLink>
            with your email and password link.
          </Alert>
        )}
      </div>
    )
  );
};
export default VerifyEmail;

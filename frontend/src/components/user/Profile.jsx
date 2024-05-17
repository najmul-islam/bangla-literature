import moment from "moment";
import { useState } from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useProfileQuery } from "../../features/user/userApi";
import Error from "../other/Error";
import Loading from "../other/Loading";

const Profile = () => {
  const [showApi, setShowApi] = useState(false);
  const dispatch = useDispatch();

  const { data: profile, isLoading, isError, error } = useProfileQuery();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error.data.message} />;

  const { name, email, createdAt, apikey } = profile;
  return (
    <Row>
      <Col></Col>

      <Col lg={6} className="py-5">
        <h4 className="text-center my-4">
          Welcome back, <span className="text-primary">{name}!</span>
        </h4>

        <div className="bg-light rounded p-3">
          <h6 className="text-secondary mb-3">Account Information</h6>

          <Stack gap={2}>
            <div>
              <h6>API key</h6>
              {showApi ? (
                <span className="fw-bold text-primary">
                  {apikey}{" "}
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => setShowApi(!showApi)}
                  >
                    hide api key
                  </Button>
                </span>
              ) : (
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => setShowApi(!showApi)}
                >
                  show api key
                </Button>
              )}
            </div>
            <div>
              <h6>Name </h6>
              <p>{name}</p>
            </div>
            <div>
              <h6>Email</h6>
              <p>{email}</p>
            </div>
            <div>
              <h6>Account Created</h6>
              <p>
                {moment(createdAt).format("MMMM DD, YYYY")} (
                {moment(createdAt).fromNow()})
              </p>
            </div>
            <div>
              <h6>Password</h6>
              <p className="d-flex gap-2 align-items-center">
                (hidden){" "}
                <Link
                  to="/user/change-password"
                  className="btn btn-warning btn-sm"
                >
                  Change password
                </Link>
              </p>
            </div>
          </Stack>
        </div>
        <Stack className="py-3">
          <Button variant="primary" size="lg" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Col>
      <Col></Col>
    </Row>
  );
};
export default Profile;

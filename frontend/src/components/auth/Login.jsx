import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect, useLayoutEffect } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useResendVerifyEmailMutation,
} from "../../features/auth/authApi";
import { loginSchema } from "../../helpers/yup";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state and mutation
  const { user } = useSelector((state) => state.user);
  const [login, { data, isLoading, isError, isSuccess, error }] =
    useLoginMutation();

  const [
    resendVerifyEmail,
    {
      isLoading: resendIsLoading,
      isError: resendIsError,
      isSuccess: resendIsSuccess,
      error: resendError,
    },
  ] = useResendVerifyEmailMutation();

  const handleResendConfirmationEmail = (email) => {
    resendVerifyEmail({ email });
  };

  // init form state
  const initialValues = {
    email: "",
    password: "",
  };

  // handle submit
  const onSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      login(values);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  useLayoutEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess || user) {
      navigate(`/profile`);
      if (isSuccess && user) {
        toast.success("login successfully");
      }
    }
  }, [user, isError, isSuccess, navigate, dispatch, error, data]);

  useEffect(() => {
    if (resendError) {
      toast.error(error?.data.message);
    }

    if (resendIsSuccess) {
      toast.success("email send successfully");
    }
  }, [resendError, resendIsSuccess, error]);

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = formik;

  return (
    !user && (
      <>
        <h4 className="text-center py-3">Login in your Account</h4>
        <Row>
          <Col>
            {resendIsError && (
              <Alert variant="danger py-3 text-center">
                {resendError.data.message}
              </Alert>
            )}

            {resendIsSuccess && (
              <Alert variant="success py-3 text-center">
                Verification email successfully sent!
              </Alert>
            )}

            {isError &&
              !resendIsSuccess &&
              (error?.data?.message ===
              "This account has not been verified. click below to resend verification email." ? (
                <Alert variant="warning py-3 text-center">
                  {error?.data?.message}
                  <Button
                    variant="warning"
                    className="my-3"
                    onClick={() => handleResendConfirmationEmail(values.email)}
                  >
                    Resend Confirmation Email
                  </Button>
                </Alert>
              ) : (
                <Alert variant="danger py-3 text-center">
                  {error?.data?.message}
                </Alert>
              ))}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  // error={Boolean(touched.email && errors.email)}
                  isInvalid={Boolean(touched.email && errors.email)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  name="password"
                  type="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  isInvalid={Boolean(touched.password && errors.password)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <div className="d-flex">
                  <NavLink
                    to="/forgot-password"
                    className="mt-2 fw-semibold ms-auto nav-link"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </Form.Group>
              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  className="d-grid"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </div>
            </Form>
            <hr />
            <Stack direction="horizontal" gap={1} className="text-center">
              <h5 className="fw-light">Already have an account?</h5>
              <NavLink to="/register" className="h5 fw-semibold">
                Register
              </NavLink>
            </Stack>
          </Col>
        </Row>
      </>
    )
  );
};

export default Login;

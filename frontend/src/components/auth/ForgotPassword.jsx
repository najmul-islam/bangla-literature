import { useFormik } from "formik";
import { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import { forgotPasswordSchema } from "../../helpers/yup";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // state and mutation
  const { user } = useSelector((state) => state.auth);

  const [forgotPassword, { isError, isSuccess, error }] =
    useForgotPasswordMutation();

  // init form state
  const initialValues = {
    email: "",
  };

  // handle submit
  const onSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      forgotPassword(values);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/reset-password");
    }

    if (user) {
      navigate("/user/profile");
    }
  }, [isError, isSuccess, user, navigate, error]);

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    formik;

  return (
    !user && (
      <>
        <h4 className="text-center py-3">Forgot Password</h4>
        <hr />

        <Row>
          <Col>
            {isError && (
              <Alert variant="danger py-3 text-center">
                {error?.data.message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="py-3 mb-2" controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" className="d-grid">
                  Reset Password
                </Button>
              </div>
            </Form>
            <hr />
            <Stack direction="horizontal" gap={1} className="text-center">
              <h5 className="fw-light">Or back to</h5>
              <NavLink to="/login" className="h5 fw-semibold">
                Login
              </NavLink>
            </Stack>
          </Col>
        </Row>
      </>
    )
  );
};
export default ForgotPassword;

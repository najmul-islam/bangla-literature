import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row, Stack, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import { forgotPasswordSchema } from "../../helpers/yup";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state and mutation
  const { user } = useSelector((state) => state.auth);
  const [forgotPassword, { data, isLoading, isError, isSuccess, error }] =
    useForgotPasswordMutation();
  // init form state

  const initialValues = {
    email: "",
    verificationcode: "",
    newpassword: "",
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
    forgotPasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (user) {
      navigate("/profile");
    }
  }, [isError, user, navigate, error]);

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = formik;

  console.log(data);
  console.log(isSuccess);
  return (
    <>
      <h4 className="text-center py-3">Forgot Password</h4>
      <hr />
      {!isSuccess && (
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                  // error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                )}
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
      )}

      {isSuccess && (
        <Row>
          <Col>
            <Alert variant="primary">
              If your account exists and is verified, we sent an email
              containing a verification code. Please enter it in the box below
              along with a new password of your choice.
            </Alert>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="number"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                  // error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                )}
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
      )}
    </>
  );
};
export default ForgotPassword;

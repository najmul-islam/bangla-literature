import { Alert, Button, Col, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authApi";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "../../helpers/yup";

const ResetPassword = () => {
  const navigate = useNavigate();

  // state and mutation
  const { user } = useSelector((state) => state.auth);
  const [resetPassword, { data, isError, isSuccess, error }] =
    useResetPasswordMutation();

  // init form state
  const initialValues = {
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // handle submit
  const onSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      resetPassword(values);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login");
    }

    if (user) {
      navigate("/user/profile");
    }
  }, [isError, isSuccess, user, navigate, error]);

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    formik;

  return (
    <Row>
      <Col>
        {isError && (
          <Alert variant="danger">
            Make sure your verification code is correct.
          </Alert>
        )}
        <Alert variant="primary">
          If your account exists and is verified, we sent an email containing a
          verification code. Please enter it in the box below along with a new
          password of your choice.
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-3 mb-4" controlId="email">
            <Form.Control
              type="text"
              name="tempPassword"
              value={values.tempPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Verification code"
              isInvalid={touched.tempPassword && errors.tempPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tempPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <hr />
          <Form.Group className="mb-3" controlId="password">
            {/* <Form.Label>New Password</Form.Label> */}
            <Form.Text cls>
              Password must contain at least 8 characters and 1 number.
            </Form.Text>
            <Form.Control
              name="newPassword"
              //   type={showPassword ? "text" : "password"}
              type="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="New Password"
              isInvalid={touched.newPassword && errors.newPassword}
            />

            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            {/* <Form.Label>Confirm Password</Form.Label> */}
            <Form.Control
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Confirm Password"
              isInvalid={touched.confirmPassword && errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" className="d-grid">
              Confirm Password
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default ResetPassword;

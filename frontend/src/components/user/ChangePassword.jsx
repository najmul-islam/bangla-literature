import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../features/user/userApi";
import { changePasswordSchema } from "../../helpers/yup";

const ChangePassword = () => {
  const navigate = useNavigate();

  // state and mutation
  const { user } = useSelector((state) => state.auth);
  const [changePassword, { isError, isSuccess, error }] =
    useChangePasswordMutation();

  // init form state
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // handle submit
  const onSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      changePassword(values);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/user/profile");
      toast.success("Password change successfully");
    }
  }, [isError, isSuccess, user, navigate, error]);

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
    <Row>
      <Col>
        {isError && <Alert variant="danger">{error?.data?.message}</Alert>}

        <h3 className="text-center py-3">Change Password</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-3 mb-4" controlId="oldPassword">
            <Form.Control
              type="password"
              name="oldPassword"
              value={values.oldPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Old Password"
              isInvalid={Boolean(touched.oldPassword && errors.oldPassword)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.oldPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <hr />
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Text cls>
              Password must contain at least 8 characters and 1 number.
            </Form.Text>
            <Form.Control
              name="newPassword"
              type="password"
              value={values.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="New Password"
              isInvalid={touched.newPassword && errors.newPassword}
            />

            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
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
            <Button
              variant="primary"
              type="submit"
              className="d-grid"
              disabled={isSubmitting}
            >
              Change Password
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default ChangePassword;

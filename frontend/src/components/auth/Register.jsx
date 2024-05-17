import { useFormik } from "formik";
import { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { registerSchema } from "../../helpers/yup";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // rtk
  const { user } = useSelector((state) => state.auth);
  const [register, { isError, isSuccess, status, error }] =
    useRegisterMutation();

  // form value
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // handle submit
  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err?.data?.message });
      setSubmitting(false);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit,
  });

  useEffect(() => {
    if (user) {
      navigate("/user/profile");
    }

    if (isError) {
      if (error?.status === 400) {
        toast.error(error?.data?.message);
      }
      toast.error(error?.error);
    }

    if (isSuccess) {
      toast.success("Register successfully");
    }
  }, [user, isError, isSuccess, navigate, dispatch, error]);

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
        <h4 className="text-center py-3">Register for API access</h4>

        <Row className="justify-content-center">
          <Col>
            {isSuccess && (
              <Alert variant="primary py-3">
                We&apos;ve sent an email with a verification link to complete
                your registration. If you don&apos;t see it in your{" "}
                <strong>inbox</strong> , please check your <strong>spam</strong>{" "}
                folder.
              </Alert>
            )}

            {isError && (
              <Alert variant="danger py-3 text-center">
                {error?.data.message}
              </Alert>
            )}

            <Form
              className="m-auto w-sm-100 w-md-75 w-lg-50"
              onSubmit={handleSubmit}
              noValidate
            >
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email"
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Password"
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
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
                  Register
                </Button>
              </div>
              <Form.Text className="text-muted">
                By clicking the button, you agree to the Terms of Service and
                Privecy Policy.
              </Form.Text>
            </Form>

            <hr />
            <Stack direction="horizontal" gap={1} className="">
              <h5 className="fw-light">Already have an account?</h5>
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

export default Register;

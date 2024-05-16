import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { loginSchema } from "../../helpers/yup";
import {
  useLoginMutation,
  useResendVerifyEmailMutation,
} from "../../features/auth/authApi";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Stack,
  Alert,
} from "react-bootstrap";

const Login = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state and mutation
  const { user } = useSelector((state) => state.auth);
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();

  const [
    resendVerifyEmail,
    {
      isLoading: resendIsLoading,
      isError: resendIsError,
      isSuccess: resendIsSuccess,
      error: resendError,
    },
  ] = useResendVerifyEmailMutation();
  // show password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // mouse dowon
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    loginSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess || user) {
      navigate("/");
      if (isSuccess && user) {
        toast.success("login successfully");
      }
    }
  }, [user, isError, isSuccess, navigate, dispatch, error]);

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
    isValid,
  } = formik;

  return (
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
            (error.data.message ===
            "This account has not been verified. click below to resend verification email." ? (
              <Alert variant="warning py-3 text-center">
                {error?.data.message}
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
                {error?.data.message}
              </Alert>
            ))}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter email"
                // error={Boolean(touched.email && errors.email)}
              />
              {touched.email && errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Password"
              />
              <NavLink to="/forgot-password" className="py-2 nav-link text-end">
                Forgot password?
              </NavLink>
            </Form.Group>
            {touched.password && errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
            <div className="d-grid">
              <Button variant="primary" type="submit" className="d-grid">
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

      {/* <Box
        sx={{
          borderRadius: "10px",
          paddingY: "20px",
          paddingX: "30px",
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack
          direction="row"
          marginBottom={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="800">
            Login
          </Typography>
          <Typography
            component={RouterLink}
            to="/register"
            variant="subtitle2"
            sx={{ textDecoration: "none" }}
            color="primary"
          >
            Don&apos;t have an account?
          </Typography>
        </Stack>
        <form noValidate onSubmit={handleSubmit}>
          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="email-login">Email Address</InputLabel>
            <OutlinedInput
              id="email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter email address"
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ height: "45px" }}
            />
            {touched.email && errors.email && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {errors.email}
              </FormHelperText>
            )}
          </Stack>

          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.password && errors.password)}
              id="password-login"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
              sx={{ height: "45px" }}
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password}
              </FormHelperText>
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            marginBottom={3}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="body2">Keep me sign in</Typography>}
            />
            <Link
              variant="body2"
              component={RouterLink}
              to=""
              color="primary"
              sx={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </Stack>

          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}

          <Button
            disableElevation
            disabled={
              isLoading ||
              !isValid ||
              values.email === "" ||
              values.password === ""
            }
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            {isLoading ? <CircularProgress size={25} /> : " Login"}
          </Button>
        </form>
      </Box> */}
    </>
  );
};

export default Login;

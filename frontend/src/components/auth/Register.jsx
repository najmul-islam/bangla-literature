import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useRegisterMutation } from "../../features/auth/authApi";
import { registerSchema } from "../../helpers/yup";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // rtk
  const { user } = useSelector((state) => state.auth);
  const [register, { isError, isSuccess, error }] = useRegisterMutation();

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
        confirmPassword: values.confirmPassword,
      });
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err?.data?.message });
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // formik
  const formik = useFormik({
    initialValues,
    registerSchema,
    onSubmit,
  });

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
    if (isError) {
      toast.error(error?.data.message);
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
    isValid,
  } = formik;

  console.log("error", error);
  return (
    <>
      <h4 className="text-center py-3">Register for free access to our APIs</h4>

      <Row className="justify-content-center">
        <Col>
          {isSuccess && (
            <Alert variant="primary py-3">
              Registration successful. Please check your email for the
              verification link.
            </Alert>
          )}

          {isError && (
            <Alert variant="danger py-3 text-center">
              {error?.data?.message}
            </Alert>
          )}

          <Form
            className="m-auto w-sm-100 w-md-75 w-lg-50"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter name"
                // error={Boolean(touched.name && errors.name)}
              />
              {touched.name && errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>

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
            </Form.Group>
            {touched.password && errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
            <div className="d-grid">
              <Button variant="primary" type="submit" className="d-grid">
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
            Registration
          </Typography>
          <Typography
            component={RouterLink}
            to="/login"
            variant="subtitle2"
            sx={{ textDecoration: "none" }}
            color="primary"
          >
            All ready have an account?
          </Typography>
        </Stack>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="name-signup">User name*</InputLabel>
            <OutlinedInput
              id="name-login"
              type="text"
              value={values.name}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="User name"
              fullWidth
              error={Boolean(touched.name && errors.name)}
              sx={{ height: "45px" }}
            />
            {touched.name && errors.name && (
              <FormHelperText error id="helper-text-name-signup">
                {errors.name}
              </FormHelperText>
            )}
          </Stack>

          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.email && errors.email)}
              id="email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Email"
              sx={{ height: "45px" }}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="helper-text-email-signup">
                {errors.email}
              </FormHelperText>
            )}
          </Stack>

          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="password-signup">Password*</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.password && errors.password)}
              id="password-signup"
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
              placeholder="Password"
              inputProps={{}}
              sx={{ height: "45px" }}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="helper-text-password-signup">
                {errors.password}
              </FormHelperText>
            )}
          </Stack>

          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="confirmPassword-signup">
              Confirm Password*
            </InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              id="confirmPassword-signup"
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              name="confirmPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Confirm Password"
              inputProps={{}}
              sx={{ height: "45px" }}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <FormHelperText error id="helper-text-password-signup">
                {errors.confirmPassword}
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
            <Typography variant="caption">
              By Signing up, you agree to our &nbsp;
              <Link
                variant="caption"
                fontWeight="bold"
                component={RouterLink}
                to="#"
              >
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link
                variant="caption"
                fontWeight="bold"
                component={RouterLink}
                to="#"
              >
                Privacy Policy
              </Link>
            </Typography>
          </Stack>
          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}

          <Button
            disableElevation
            disabled={
              isError ||
              isSubmitting ||
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
            Create Account
          </Button>
        </Box>
      </Box> */}
    </>
  );
};

export default Register;

import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Name is too long")
    .min(4, "Name is too short")
    .required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .test(
      "length",
      "Password must contain at least 8 characters",
      (value) => value && value.length >= 8
    )
    .test(
      "containsNumber",
      "Password must contain at least 1 number",
      (value) => value && /\d/.test(value)
    )
    .test(
      "containsBoth",
      "Password must contain at least 8 characters and 1 number",
      (value) => value && value.length >= 8 && /\d/.test(value)
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valied email")
    .max(255)
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  tempPassword: Yup.number().required("Verification Code required"),

  newPassword: Yup.string()
    .test(
      "length",
      "Password must contain at least 8 characters",
      (value) => value && value.length >= 8
    )
    .test(
      "containsNumber",
      "Password must contain at least 1 number",
      (value) => value && /\d/.test(value)
    )
    .test(
      "containsBoth",
      "Password must contain at least 8 characters and 1 number",
      (value) => value && value.length >= 8 && /\d/.test(value)
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),

  newPassword: Yup.string()
    .test(
      "length",
      "Password must contain at least 8 characters",
      (value) => value && value.length >= 8
    )
    .test(
      "containsNumber",
      "Password must contain at least 1 number",
      (value) => value && /\d/.test(value)
    )
    .test(
      "containsBoth",
      "Password must contain at least 8 characters and 1 number",
      (value) => value && value.length >= 8 && /\d/.test(value)
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

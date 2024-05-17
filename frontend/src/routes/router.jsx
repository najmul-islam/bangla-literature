import { Route, Routes } from "react-router-dom";

// layout
import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";

// public pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ApiPage from "../pages/public/ApiPage";
import BlogPage from "../pages/public/BlogPage";
import ExamplesPage from "../pages/public/ExamplesPage";
import HomePage from "../pages/public/HomePage";

// user pages
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import ChangePasswordPage from "../pages/user/ChangePasswordPage";
import ProfilePage from "../pages/user/ProfilePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route path="/user/" element={<UserLayout roles={["user"]} />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* <Route path="/moderator/" element={<UserLayout roles={["moderator"]} />}>
        <Route path="profile" element={<ProfilePage />} />
      </Route> */}
    </Routes>
  );
};

export default Router;

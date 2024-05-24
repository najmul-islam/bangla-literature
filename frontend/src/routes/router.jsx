import { Route, Routes } from "react-router-dom";

// layout
import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";

// public pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ApiPage from "../pages/public/ApiPage";
import BlogPage from "../pages/public/BlogPage";
import ContactUsPage from "../pages/public/ContactUsPage";
import ExamplesPage from "../pages/public/ExamplesPage";
import FaqPage from "../pages/public/FaqPage";
import HomePage from "../pages/public/HomePage";
import NotFoundPage from "../pages/public/NotFoundPage";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
import TermsAndConditionsPage from "../pages/public/TermsAndConditionsPage";
import ChangePasswordPage from "../pages/user/ChangePasswordPage";
import ProfilePage from "../pages/user/ProfilePage";

// user pages
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

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
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Route>

      <Route path="/user/" element={<UserLayout roles={["user"]} />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* <Route path="/moderator/" element={<UserLayout roles={["moderator"]} />}>
        <Route path="profile" element={<ProfilePage />} />
      </Route> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

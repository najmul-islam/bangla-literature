import { Route, Routes } from "react-router-dom";

// layout
import SubscriberLayout from "../layouts/SubscriberLayout";
import ModeratorLayout from "../layouts/ModeratorLayout";
import AdminLayout from "../layouts/AdminLayout";

// public pages
import PublicLayout from "../layouts/PublicLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ApiPage from "../pages/public/ApiPage";
import BlogPage from "../pages/public/BlogPage";
import ContactUsPage from "../pages/public/ContactUsPage";
import ExamplesPage from "../pages/public/ExamplesPage";
import FaqPage from "../pages/public/FaqPage";
import HomePage from "../pages/public/HomePage";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
import TermsAndConditionsPage from "../pages/public/TermsAndConditionsPage";

// auth pages
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import ChangePasswordPage from "../pages/user/ChangePasswordPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import ProfilePage from "../pages/user/ProfilePage";

// moderator pages
import AddPage from "../pages/moderator/AddPage";
import UserLayout from "../layouts/UserLayout";
import DashboradPage from "../pages/moderator/DashboradPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
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

      <Route path="/" element={<UserLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      <Route
        path="/"
        element={
          <SubscriberLayout roles={["subscriber", "moderator", "admin"]} />
        }
      ></Route>

      <Route
        path="/moderator/"
        element={<ModeratorLayout roles={["moderator", "admin"]} />}
      >
        <Route path="dashboard" element={<DashboradPage />} />
        <Route path="add" element={<AddPage />} />
      </Route>

      <Route path="/admin/" element={<AdminLayout roles={["admin"]} />}>
        <Route path="dashboard" element={<ProfilePage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
        <Route path="add" element={<AddPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import Register from "../components/auth/Register";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
export default PublicRoute;

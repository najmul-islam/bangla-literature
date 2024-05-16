import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProfilePage from "../pages/ProfilePage";

const AdminRoute = () => {
  return (
    <Route
      path="/admin/*"
      element={<AdminLayout roles={["user", "moderator", "admin"]} />}
    >
      <Route path="admin" element={<ProfilePage />} />
    </Route>
  );
};
export default AdminRoute;

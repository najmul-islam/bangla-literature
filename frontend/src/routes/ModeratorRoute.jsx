import { Route } from "react-router-dom";
import ModeratorLayout from "../layouts/ModeratorLayout";
import ProfilePage from "../pages/ProfilePage";

const ModeratorRoute = () => {
  return (
    <Route
      path="/moderator/*"
      element={<ModeratorLayout roles={["user", "moderator"]} />}
    >
      <Route path="moderator" element={<ProfilePage />} />
    </Route>
  );
};
export default ModeratorRoute;

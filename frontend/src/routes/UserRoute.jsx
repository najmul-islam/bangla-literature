import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProfilePage from "../pages/user/ProfilePage";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/user/*" element={<UserLayout roles={["user"]} />}>
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
export default UserRoute;

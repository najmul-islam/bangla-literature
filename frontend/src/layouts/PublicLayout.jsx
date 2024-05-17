import { Outlet } from "react-router-dom";
import NavBar from "../components/header/Navbar";

const PublicLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
export default PublicLayout;

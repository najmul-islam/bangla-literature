import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default PublicLayout;

import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default PublicLayout;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Loading from "../components/other/Loading";

const UserLayout = () => {
  const { user, isLoading } = useSelector((state) => state.user);

  if (isLoading) return <Loading />;
  return user ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserLayout;

import { Toaster } from "react-hot-toast";
import Router from "./routes/router";
import { userApi } from "./features/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { userAction } from "./features/user/userSlice";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (token) {
      dispatch(userApi.endpoints.user.initiate())
        .unwrap()
        .then((data) => dispatch(userAction(data)));
    }
  }, [token, dispatch]);

  return (
    <>
      <Router />
      <Toaster position="bottom-center" />
    </>
  );
};
export default App;

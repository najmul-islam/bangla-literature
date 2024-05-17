import { Toaster } from "react-hot-toast";
import Router from "./routes/router";

const App = () => {
  return (
    <>
      <Router />
      <Toaster position="bottom-center" />
    </>
  );
};
export default App;

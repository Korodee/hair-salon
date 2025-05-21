import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <AppProvider>
      <Outlet />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;

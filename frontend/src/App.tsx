import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppProvider } from "./context/appContext.jsx";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Booking from "./pages/dashboard/Booking";
import History from "./pages/dashboard/History";
import Gallery from "./pages/dashboard/Gallery";
import Profile from "./pages/dashboard/Profile";
import VerifyEmail from "./pages/auth/VerifyEmail";
import CheckInbox from "./pages/auth/CheckInbox";
import ResetPassword from "./pages/auth/ResetPassword";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/check-inbox" element={<CheckInbox />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/booking"
            element={
              <DashboardLayout>
                <Booking />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/history"
            element={
              <DashboardLayout>
                <History />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/gallery"
            element={
              <DashboardLayout>
                <Gallery />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />
        </Routes>
        <ToastContainer />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;

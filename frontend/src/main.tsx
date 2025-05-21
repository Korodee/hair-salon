import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
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
import DashboardLayout from "./layouts/DashboardLayout";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/check-inbox" element={<CheckInbox />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="booking" element={<Booking />} />
        <Route path="history" element={<History />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Complaint from "./Pages/User/Complaint";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const currentLocation = window.location.pathname;
  const reactQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  useEffect(() => {
    if (currentLocation !== "/login" && currentLocation !== "/verify-email") {
      window.location.href = "/login";
    }
  }, [currentLocation]);
  return (
    <div>
      <QueryClientProvider client={reactQueryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <BrowserRouter>
            {/* <AuthProvider> */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/complaint" element={<Complaint />} />
            </Routes>
            {/* </AuthProvider> */}
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;

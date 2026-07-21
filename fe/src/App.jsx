import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SignIn, SignUp } from "@clerk/clerk-react";

import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/sign-in/*" element={<AuthPage />} />

        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

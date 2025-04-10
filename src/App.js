import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import JobList from "./components/JobList";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import UserDashboard from "./components/UserDashboard";

// ✅ Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobList />} />

        {/* ✅ Role-Based Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["ADMIN"]} />} />
        <Route path="/recruiter-dashboard" element={<ProtectedRoute element={<RecruiterDashboard />} allowedRoles={["RECRUITER"]} />} />
        <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["USER"]} />} />
        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />
      </Routes>
    </Router>
  );
};

export default App;

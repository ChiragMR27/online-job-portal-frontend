import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });

      // ✅ Store token and role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      alert("Login successful!");

      // ✅ Redirect based on role
      if (response.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "RECRUITER") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/jobs");
      }

    } catch (error) {
      alert("Invalid email or password.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

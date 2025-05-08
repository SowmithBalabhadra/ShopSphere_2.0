import React, { useState } from "react";
import axios from "axios";
import "./LoginComponent.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAlertAndRedirect = () => {
    alert("Login successful!");
    window.location.href = "http://localhost:5174/dashboard";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        formData,
        {
          withCredentials: true, // ✅ Send and receive cookies
        }
      );

      if (response.status === 200 && response.data.success) {
        console.log("✅ Token received (cookie set):", response.data);
        handleAlertAndRedirect();
      } else {
        setError(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

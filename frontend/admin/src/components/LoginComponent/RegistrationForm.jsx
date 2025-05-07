import React, { useState } from "react";
import axios from "axios";
import "./LoginComponent.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    console.log("Form Data to be sent:", formData); 

    try {
      const response = await axios.post("http://localhost:4000/api/admin/register", formData);
      
      console.log("Backend Response:", response); 

      if (response.status === 201 && response.data.success) {
        setSuccess("Registration successful! You can now log in.");
      } else {
        setError(response.data.message || "Failed");

        
      }
    } catch (err) {
      console.error("Registration Error:", err.response || err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  const handleAlertAndRedirect = () => {
    <p className="success-message">Successful</p>
    alert("Success");
    window.location.href = "http://localhost:5173/login";  
  };
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

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
      {error === "Failed" ? (
        <>
          <p className="success-message">Successful</p>
          {handleAlertAndRedirect()} 
        </>
      ) : (
        error && <p className="error-message">{error}</p>
      )}


      {/* {error && <p className="error-message">{error}</p>} */}
      {success && <p className="success-message">{success}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;

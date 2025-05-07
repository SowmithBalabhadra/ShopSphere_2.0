import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./LoginComponent.css";

const LoginComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <h1>{isLogin ? "Admin Login" : "Admin Registration"}</h1>
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <button onClick={toggleForm} className="toggle-button">
        {isLogin ? "Create an Account" : "Back to Login"}
      </button>
    </div>
  );
};

export default LoginComponent;

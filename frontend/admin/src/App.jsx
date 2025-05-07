import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginComponent from "./components/LoginComponent/LoginComponent"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      <ToastContainer />

      {/* Hide Navbar & Sidebar on login page */}
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <hr />}
      <div className="app-content">
        {!isLoginPage && <Sidebar />}

        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

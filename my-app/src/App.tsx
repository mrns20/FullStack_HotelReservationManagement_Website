import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import BookNow from "./pages/BookNow";
import Login from "./pages/Login";
import NeedHelp from "./pages/NeedHelp";
import PaymentPage from "./pages/PaymentPage";
import Rooms from "./pages/Rooms";
import SignUp from "./pages/SignUp";
import axiosInstance from "./axiosConfig";

const App: React.FC = () => {
  // Set a global response interceptor (optional) ,Check for unauthorized error (e.g., 401) , Clear token and redirect to login
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/need-help" element={<NeedHelp />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;

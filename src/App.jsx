import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./components/SideBar";
import { HorizontalCard } from "./components/HorizontalCard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { AdminProfile } from "./pages/AdminProfile";
import TestPage from "./pages/Test";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

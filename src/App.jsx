import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./components/SideBar";
import { HorizontalCard } from "./components/HorizontalCard";
import { Table } from "./components/Table";
import { Table1} from "./components/Table1";
import { AdminDashboard } from "./pages/AdminDashboard";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { AdminProfile } from "./pages/AdminProfile";
import TestPage from "./pages/Test";
import {AdminEquipment} from "./pages/AdminEquipment";
import {AdminTrainer} from "./pages/AdminTrainer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/equipment" element={<AdminEquipment />} />
          <Route path="/trainers" element={<AdminTrainer />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;

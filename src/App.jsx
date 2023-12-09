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
import { TrainerDashboard } from "./pages/TrainerDashboard";
import {TrainerProfile} from "./pages/TrainerProfile";
import {TrainerAttendance} from "./pages/TrainerAttendance";
import {TrainerCompetition} from "./pages/TrainerCompetition";
import { StudentDashboard } from "./pages/StudentDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/stud_dashboard" element={<StudentDashboard />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/equipment" element={<AdminEquipment />} />
          <Route path="/trainers" element={<AdminTrainer />} />
          <Route path="/trainerdashboard" element={<TrainerDashboard />} />
          <Route path="/trainerprofile" element={<TrainerProfile />} />
          <Route path="/trainerattendance" element={<TrainerAttendance />} />
          <Route path="/competition" element={<TrainerCompetition />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

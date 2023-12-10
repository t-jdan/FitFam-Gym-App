import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { AdminProfile } from "./pages/Admin/AdminProfile";
import TestPage from "./pages/Test";
import {AdminEquipment} from "./pages/Admin/AdminEquipment";
import {AdminTrainer} from "./pages/Admin/AdminTrainer";
import { TrainerDashboard } from "./pages/Trainers/TrainerDashboard";
import {TrainerProfile} from "./pages/Trainers/TrainerProfile";
import {TrainerAttendance} from "./pages/Trainers/TrainerAttendance";
import {TrainerCompetition} from "./pages/Trainers/TrainerCompetition";
import { StudentDashboard } from "./pages/Student/StudentDashboard";
import { StudentCompetition } from "./pages/Student/StudentCompetition";
import { TrainerSchedule } from "./pages/Trainers/TrainerSchedule";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Sign in and Log in */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/equipment" element={<AdminEquipment />} />
          <Route path="/trainers" element={<AdminTrainer />} />

          {/* Student */}
          <Route path="/stud_dashboard" element={<StudentDashboard />} />
          <Route path="/stud_competition" element={<StudentCompetition />} />
          <Route path="/trainer_schedule" element={<TrainerSchedule />} />
          <Route path="/stud_complaint" element={<TrainerSchedule />} />
          <Route path="/stud_profile" element={<TrainerSchedule />} />
          <Route path="/test" element={<TestPage />} />

          {/* Trainers */}
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

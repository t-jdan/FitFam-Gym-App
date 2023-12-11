import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { AdminProfile } from "./pages/admin/AdminProfile";
import { AdminEquipment } from "./pages/admin/AdminEquipment";
import { AdminTrainer } from "./pages/admin/AdminTrainer";
import { TrainerDashboard } from "./pages/trainer/TrainerDashboard";
import { TrainerProfile } from "./pages/trainer/TrainerProfile";
import { TrainerAttendance } from "./pages/trainer/TrainerAttendance";
import { TrainerCompetition } from "./pages/trainer/TrainerCompetition";
import { SchedulePage } from "./pages/trainer/Schedule";
import { HomePage } from "./pages/Homepage";
import { AboutPage } from "./pages/AboutPage";
import {ViewAttendance} from "./pages/admin/ViewAttendance";
import { Report } from "./pages/admin/Report";
import { StudentDashboard } from "./pages/Student/StudentDashboard";
import { StudentCompetition } from "./pages/Student/StudentCompetition";
import { TrainerSchedule } from "./pages/trainer/TrainerSchedule";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/equipment" element={<AdminEquipment />} />
          <Route path="/trainers" element={<AdminTrainer />} />
          <Route path="/attendance" element={<ViewAttendance />} />
          <Route path="/trainerdashboard" element={<TrainerDashboard />} />
          <Route path="/trainerprofile" element={<TrainerProfile />} />
          <Route path="/trainerattendance" element={<TrainerAttendance />} />
          <Route path="/competition" element={<TrainerCompetition />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<Report />} />
           {/* Student */}
           <Route path="/stud_dashboard" element={<StudentDashboard />} />
          <Route path="/stud_competition" element={<StudentCompetition />} />
          <Route path="/trainer_schedule" element={<TrainerSchedule />} />
          <Route path="/stud_complaint" element={<TrainerSchedule />} />
          <Route path="/stud_profile" element={<TrainerSchedule />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

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
import { SchedulePage } from "./pages/admin/Schedule";
import { HomePage } from "./pages/Homepage";
import { AboutPage } from "./pages/AboutPage";
import {ViewAttendance} from "./pages/admin/ViewAttendance";
import { Report } from "./pages/admin/Report";
import { StudentDashboard } from "./pages/Student/StudentDashboard";
import { StudentCompetition } from "./pages/Student/StudentCompetition";
import { TrainerSchedule } from "./pages/Student/TrainerSchedule";
import { TrainerSchedule1 } from "./pages/trainer/TrainerSchedule1";
import { StudentProfile } from "./pages/Student/StudentProfile";
import { StudentComplaint } from "./pages/Student/StudentComplaint";
import { Complaint } from "./pages/trainer/Complaint";
import { GymLeaderboard } from "./pages/Student/GymLeaderboard";
import {CompetitionList} from "./pages/trainer/ViewLeaderboard";


function App() {
  return (
    <>
      <Router>
        <Routes>
           {/* Main routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />

           {/* Admin routes */}
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/equipment" element={<AdminEquipment />} />
          <Route path="/trainers" element={<AdminTrainer />} />
          <Route path="/attendance" element={<ViewAttendance />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/report" element={<Report />} />
          

           {/* Trainer */}
          <Route path="/trainerdashboard" element={<TrainerDashboard />} />
          <Route path="/trainerprofile" element={<TrainerProfile />} />
          <Route path="/trainerattendance" element={<TrainerAttendance />} />
          <Route path="/competition" element={<TrainerCompetition />} />
          <Route path="/trainerschedule" element={<TrainerSchedule1 />} />
          <Route path="/viewcomplaint" element={<Complaint />} />
          <Route path="/viewleaderboard" element={<CompetitionList />} />
          
          
           {/* Student */}
           <Route path="/stud_dashboard" element={<StudentDashboard />} />
          <Route path="/stud_competition" element={<StudentCompetition />} />
          <Route path="/trainer_schedule" element={<TrainerSchedule />} />
          <Route path="/stud_complaint" element={<StudentComplaint/>} />
          <Route path="/stud_profile" element={<StudentProfile />} /> 
          <Route path="/leaderboard" element={<GymLeaderboard />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;

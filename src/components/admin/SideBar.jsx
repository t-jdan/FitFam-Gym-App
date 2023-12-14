import {
  Archive,
  BookCheck,
  Dumbbell,
  File,
  Group,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users2,Calendar
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import useUserStore from "../../store/useUserStore";
import AshesiLogo from "../../assets/AshesiLogo.jpeg"


function Sidebar() {
  const location = useLocation();
  const isActive = (href) => location.pathname === href;

  const { user } = useUserStore();
  console.log(user);

  const [userCreds, setUser] = useState({});

  // console.log(auth.currentUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, you can set user details here
        setUser(userCreds);
      } else {
        // User is signed out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  // });

  const navigate = useNavigate();
  return (
    <div className="w-[200px] h-screen bg-[#A30A00] text-white flex flex-col justify-between py-3">
      <div className="flex items-center flex flex-col items-center px-5">
        <div className="w-20 h-20">
          <img
            className="rounded"
            src={AshesiLogo} 
            alt="Ashesi Logo"
          />
        </div>
        {auth.currentUser && (
          <>
            <span className="text-lg font-bold">
              {auth.currentUser?.displayName}
            </span>
            <span className="">{auth.currentUser?.email}</span>
          </>
        )}
      </div>
      <div className="space-y-5">
        <Link
          to="/dashboard"
          style={
            isActive("/dashboard")
              ? { background: "white", color: "black" }
              : {}
          }
          className="flex items-center w-full cursor-pointer"
          // href="/dashboard"
        >
          <div
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
            data-id="/dashboard"
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link
          to="/profile"
          style={
            isActive("/profile") ? { background: "white", color: "black" } : {}
          }
          className="flex items-center w-full space-x-2 cursor-pointer"
          // href="/profile"
        >
          <div
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
            data-id="/profile"
          >
            <UserRound />
            <span>Profile</span>
          </div>
        </Link>
        <Link
          to={"/attendance"}
          style={
            isActive("/attendance")
              ? { background: "white", color: "black" }
              : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          // href="/attendance"
        >
          <div
            data-id="/attendance"
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <BookCheck />
            <span>Attendance</span>
          </div>
        </Link>
        <Link
          to={"/equipment"}
          style={
            isActive("/equipment")
              ? { background: "white", color: "black" }
              : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          // href="/equipment"
        >
          <div
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
            data-id="/equipment"
          >
            <Archive />
            <span>Equipment</span>
          </div>
        </Link>
        <Link
          to={"/trainers"}
          style={
            isActive("/trainers") ? { background: "white", color: "black" } : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          // href="/trainers"
        >
          <div
            data-id="/trainers"
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <Users2 />
            <span> Trainers</span>
          </div>
        </Link>
        <Link
          style={
            isActive("/schedule") ? { background: "white", color: "black" } : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          to="/schedule"
        >
          <div
            data-id="/schedule"
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <Calendar/>
            <span> Schedule</span>
          </div>
          </Link>
        
        <Link
          to={"/report"}
          style={
            isActive("/report") ? { background: "white", color: "black" } : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          // href="/report"
        >
          <div
            data-id="/report"
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <File />
            <span>Report</span>
          </div>
        </Link>
      </div>
      <div>
        <div
          onClick={async () => {
            await signOut(auth);
            navigate("/");
          }}
          className="flex cursor-pointer items-center px-4 space-x-2"
        >
          <LogOut />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

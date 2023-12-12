import {
  Archive,
  BookCheck,
  Dumbbell,
  File,
  Group,
  LayoutDashboard,
  LogOut,
  UserRound,
  Calendar,Trophy
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Sidebar() {
  const location = useLocation();
  const isActive = (href) => location.pathname === href;

  const [user, setUser] = useState({});

  console.log(auth.currentUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, you can set user details here
        setUser(user);
      } else {
        // User is signed out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-[200px] h-screen bg-[#A30A00] text-white flex flex-col justify-between py-3">
      <div className="flex items-center flex flex-col items-center px-5">
        <div className="w-20 h-20">
          <img
            className="rounded-full"
            src="https://th.bing.com/th/id/OIP.2ZBBR3boEmD38j7QHUM6YAHaHa?w=193&h=193&c=7&r=0&o=5&pid=1.7"
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
          to={"/trainerdashboard"}
          style={
            isActive("/trainerdashboard")
              ? { background: "white", color: "black" }
              : {}
          }
          className="flex items-center w-full cursor-pointer"
          // href="/trainerdashboard"
        >
          <div
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
            data-id="/trainerdashboard"
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link
          style={
            isActive("/trainerprofile")
              ? { background: "white", color: "black" }
              : {}
          }
          className="flex items-center w-full space-x-2 cursor-pointer"
          to="/trainerprofile"
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
          style={
            isActive("/trainerattendance")
              ? { background: "white", color: "black" }
              : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          to="/trainerattendance"
        >
          <div
            data-id="/trainerattendance"
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <BookCheck />
            <span>Attendance</span>
          </div>
        </Link>
        <Link
          style={
            isActive("/competition")
              ? { background: "white", color: "black" }
              : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          to="/competition"
        >
          <div
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
            data-id="/competition"
          >
            <Archive />
            <span>Competition</span>
          </div>
        </Link>
        <Link
            style={
              isActive("/leaderboard")
                ? { background: "white", color: "black" }
                : {}
            }
            className="flex items-center  w-full cursor-pointer"
            href="/leaderboard"
          >
            <div
              className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
              data-id="/leaderboard"
            >
              <Trophy/>
              <span>Leaderboard</span>
            </div>
            </Link>
       
        <Link
          style={
            isActive("/trainerschedule") ? { background: "white", color: "black" } : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          to="/trainerschedule"
        >
          <div
            data-id="/trainerschedule"
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <Calendar />
            <span> Schedule</span>
          </div>
          </Link>

        {/* <div
            data-id="/trainers"
            className="flex items-center px-4 space-x-2 cursor-pointer"
          >
            <Dumbbell />
            <span>Trainers</span>
          </div> */}
        <Link
          style={
            isActive("/complaint") ? { background: "white", color: "black" } : {}
          }
          className="flex items-center space-x-2 cursor-pointer"
          to="/complaint"
        >
          <div
            data-id="/complaint"
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <File />
            <span>Complaint</span>
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

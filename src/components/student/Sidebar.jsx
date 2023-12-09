import {
    Archive,
    CalendarCheck,
    Dumbbell,
    File,
    Group,
    LayoutDashboard,
    LogOut,
    UserRound,
    Users2,
    Flag,
  } from "lucide-react";
  import React, { useEffect, useState } from "react";
  import { auth } from "../../../firebaseConfig";
  import { useLocation, useNavigate } from "react-router-dom";
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
        <div className="flex flex-col items-center px-5">
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
          <a
            style={
              isActive("/stud_dashboard")
                ? { background: "white", color: "black" }
                : {}
            }
            className="flex items-center w-full cursor-pointer"
            href="/stud_dashboard"
          >
            <div
              className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
              data-id="/stud_dashboard"
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </div>
          </a>
          <a
            style={
              isActive("/competition") ? { background: "white", color: "black" } : {}
            }
            className="flex items-center w-full space-x-2 cursor-pointer"
            href="/competition"
          >
            <div
              className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
              data-id="/competition"
            >
              <Dumbbell />
              <span>Competition</span>
            </div>
          </a>
          <a
            style={
              isActive("/attendance")
                ? { background: "white", color: "black" }
                : {}
            }
            className="flex items-center space-x-2 cursor-pointer"
            href="/attendance"
          >
            <div
              data-id="/attendance"
              className="flex items-center px-4 space-x-2 cursor-pointer"
            >
              <CalendarCheck />
              <span>Trainer Schedule</span>
            </div>
          </a>
          <a
            style={
              isActive("/equipment")
                ? { background: "white", color: "black" }
                : {}
            }
            className="flex items-center space-x-2 cursor-pointer"
            href="/equipment"
          >
            <div
              className="flex items-center px-4 space-x-2 cursor-pointer"
              data-id="/equipment"
            >
              <Flag />
              <span>Complaint</span>
            </div>
          </a>
          <a
            style={
              isActive("/report") ? { background: "white", color: "black" } : {}
            }
            className="flex items-center space-x-2 cursor-pointer"
            href="/report"
          >
            <div
              data-id="/report"
              className="flex items-center px-4 space-x-2 cursor-pointer"
            >
              <UserRound />
              <span>Profile</span>
            </div>
          </a>
        </div>
        <div>
          <div
            onClick={async () => {
              await signOut(auth);
              navigate("/login");
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
  
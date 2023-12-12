import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { doc, getDoc } from "firebase/firestore";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate();

  const { updateUser, user } = useUserStore();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    setError(""); // Clear any existing errors
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) return; // Stop the login process if validation fails

    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const userDataDoc = await getDoc(doc(db, "user_data", res.user.uid));
        if (userDataDoc.exists()) {
          updateUser(userDataDoc.data());
          // Navigate based on user role
          switch(userDataDoc.data().role) {
            case 0:
              navigate("/dashboard");
              break;
            case 1:
              navigate("/trainerdashboard");
              break;
            default:
              navigate("/stud_dashboard");
          }
        }
      })
      .catch((e) => setError(e.message)); // Display an error message for authentication issues
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#ECE9E9] space-y-4">
        <div className="font-bold text-2xl mb-5">Login</div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Email*</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-xl w-full border"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Password*</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-xl w-full border"
              placeholder="Enter your password"
            />
          </div>
        </div>
        {error && <div className="text-red-500 mb-3">{error}</div>} {/* Display error message */}
        <div>
          Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a>
        </div>
        <div className="w-[400px]">
          <button
            onClick={handleLogin}
            className="bg-[#A30A00] p-2 rounded-xl w-full text-white font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

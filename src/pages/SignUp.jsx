import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import useUserStore from "../store/useUserStore";

export const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useUserStore();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${userDetails.firstName} ${userDetails.lastName}`,
      });

      await setDoc(doc(db, "user_data", userCredential.user.uid), {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        dateOfBirth: userDetails.dateOfBirth,
        role: 2
      });

      updateUser({...userDetails, role: 2});
      console.log("User registered and data stored successfully");
      navigate("/login");
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          setError("Password should be at least 6 characters long.");
          break;
        case "auth/email-already-in-use":
          setError("An account with this email address already exists.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address. Please enter a valid email.");
          break;
        default:
          setError("An error occurred while registering. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#ECE9E9] space-y-4">
        <div className="font-bold text-2xl mb-5">Sign Up</div>
        <form className="grid grid-cols-2 gap-x-4" onSubmit={handleSubmit}>
          {/* Input fields */}
          {Object.entries(userDetails).map(([key, value]) => (
            key !== 'confirmPassword' && (
              <div className="flex flex-col items-start w-[400px] space-y-2" key={key}>
                <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}*</span>
                <input
                  name={key}
                  type={key === 'password' ? 'password' : key === 'dateOfBirth' ? 'date' : 'text'}
                  className="p-2 rounded-xl w-full"
                  value={value}
                  onChange={handleChange}
                  required
                />
              </div>
            )
          ))}
          {/* Confirm Password */}
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Confirm Password*</span>
            <input
              name="confirmPassword"
              type="password"
              className="p-2 rounded-xl w-full"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="text-red-500 mb-3">{error}</div>}
        </form>
        <div>
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </div>
        <div className="w-1/2">
          <button
            onClick={handleSubmit}
            className="bg-[#A30A00] p-2 rounded-xl w-full text-white font-semibold"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

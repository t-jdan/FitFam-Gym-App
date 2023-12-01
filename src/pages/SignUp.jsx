import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig"; // Import Firebase auth
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      // Update the user profile if needed
      await updateProfile(userCredential.user, {
        displayName: `${userDetails.firstName} ${userDetails.lastName}`,
      });

      // Store additional user details in Firestore
      await setDoc(doc(db, "user_data", userCredential.user.uid), {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        dateOfBirth: userDetails.dateOfBirth,
      });

      console.log("User registered and data stored successfully");
      navigate("/dashboard"); // Redirect or update UI
    } catch (error) {
      console.error("Error during registration: ", error.message);
      alert(error.message); // Display error message
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#ECE9E9] space-y-4 ">
        <div className="font-bold text-2xl mb-5">Sign-up</div>
        <form className="grid grid-cols-2 gap-x-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>ID*</span>
            <input
              name="id"
              type="text"
              className="p-2 rounded-xl w-full"
              value={userDetails.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>FirstName*</span>
            <input
              name="firstName"
              type="text"
              className="p-2 rounded-xl w-full"
              value={userDetails.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>LastName*</span>
            <input
              name="lastName"
              type="text"
              className="p-2 rounded-xl w-full"
              value={userDetails.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Email*</span>
            <input
              name="email"
              type="email"
              className="p-2 rounded-xl w-full"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Phone Number*</span>
            <input
              name="phoneNumber"
              type="text"
              className="p-2 rounded-xl w-full"
              value={userDetails.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Create Password*</span>
            <input
              name="password"
              type="password"
              className="p-2 rounded-xl w-full"
              value={userDetails.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Retype Password*</span>
            <input
              name="confirmPassword"
              type="password"
              className="p-2 rounded-xl w-full"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col items-start w-[400px] space-y-2">
            <span>Date of Birth *</span>
            <input
              name="dateOfBirth"
              type="text"
              className="p-2 rounded-xl w-full"
              value={userDetails.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <div>
          Already have an account ? <a href="/login">login</a>
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

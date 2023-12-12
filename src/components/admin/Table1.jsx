import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import {
  collection,
  getDocs,
  query,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { RefreshCw, Trash2 } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const Table1 = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setstartDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "trainers")));
        const trainersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(trainersList);
      } catch (error) {
        console.error("Error fetching trainers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTrainers = trainers.filter((trainer) => {
    return (
      trainer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.startDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to open modal in edit mode
  const openEditModal = (trainer) => {
    setIsEditMode(true);
    setCurrentEditingId(trainer.id);
    setfirstName(trainer.firstName);
    setlastName(trainer.lastName);
    setStatus(trainer.status);
    setstartDate(trainer.startDate);
    setIsModalOpen(true);
  };

  // Function to handle update
  const updateTrainer = async (id, updatedTrainer) => {
    await updateDoc(doc(db, "trainers", id), updatedTrainer);
  };

  // Modify handleSubmit to handle both add and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrainer = {
      firstName,
      lastName,
      status,
      email,
      password,
      startDate,
    };

    try {
      if (isEditMode) {
        await updateTrainer(currentEditingId, newTrainer);
        setTrainers((prevTrainers) =>
          prevTrainers.map((trainer) =>
            trainer.id === currentEditingId
              ? { ...trainer, ...newTrainer }
              : trainer
          )
        );
      } else {
        const newDoc = await addDoc(collection(db, "trainers"), newTrainer);
        setTrainers((prevTrainers) => [
          ...prevTrainers,
          { id: newDoc.id, ...newTrainer },
        ]);

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update the user profile if needed
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });

        // Store additional user details in Firestore
        await setDoc(doc(db, "user_data", userCredential.user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: 1,
        });
      }
      // Reset form and modal state
      setIsEditMode(false);
      setCurrentEditingId(null);
      setfirstName("");
      setEmail("");
      setPassword("");
      setlastName("");
      setStatus("");
      setstartDate("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding/updating trainer: ", error);
    }
  };

  // Function to delete equipment
  const deleteTrainer = async (firstName) => {
    try {
      await deleteDoc(doc(db, "trainers", firstName));
      setTrainers((prevTrainer) =>
        prevTrainer.filter((e) => e.id !== firstName)
      );
    } catch (error) {
      console.error("Error deleting trainer: ", error);
    }
  };

  const handleCloseModal = () => {
    // Clear the form and close the modal
    setfirstName("");
    setlastName("");
    setStatus("");
    setstartDate("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-full p-5">
      {/* Title "Trainers" */}
      <div className="w-full text-left mb-4 ml-5">
        <h1 className="text-2xl font-bold text-black mb-4">Trainers</h1>
      </div>

      <div className="w-full flex justify-left ml-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 mb-2 border text-black hover:bg-gray-800 shadow-xl font-bold py-2 px-4 rounded-full"
        >
          Add Trainer
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
            <form onSubmit={handleSubmit}>
              {/* Trainer ID */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="Enter Trainer Firstname"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Enter Trainer LastName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Trainer Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Trainer Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* Status */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Enter Status"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Maintenance Schedule */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setstartDate(e.target.value)}
                  placeholder="Enter Trainer start date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-full mr-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="inline-block p-8 bg-black shadow-lg rounded-lg ml-4 text-white">
        {/* Header section with title and search bar */}
        <div className="flex justify-between mb-4">
          {/* Title */}
          <h1 className="text-lg font-semibold">Manage Trainer</h1>

          {/* Search bar */}
          <div className="flex items-center bg-gray-700 p-2 rounded">
            <input
              className="bg-transparent border-none outline-none w-full text-white"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 19l-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      FirstName
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      LastName
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {filteredTrainers.map((trainer, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {trainer.firstName}{" "}
                        {/* Adjusted to match Firestore field */}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {trainer.lastName}{" "}
                        {/* Adjusted to match Firestore field */}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {trainer.status}{" "}
                        {/* Adjusted to match Firestore field */}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {trainer.startDate}{" "}
                        {/* Adjusted to match Firestore field */}
                      </td>
                      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(trainer)}
                          className="bg-white hover:bg-indigo-700 text-black font-bold py-1 px-2 rounded-full"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteTrainer(trainer.id)}
                          className="bg-white text-black hover:text-red-700 py-1 px-2 rounded-full"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

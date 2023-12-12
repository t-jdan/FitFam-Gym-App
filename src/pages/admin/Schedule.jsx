import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { Layout } from "../../components/admin/Layout";
import { ScheduleForm } from "../../components/admin/ScheduleForm";
import { ScheduleDisplay } from "../../components/admin/ScheduleDisplay";

export const SchedulePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [user] = useAuthState(auth); // This hook provides the current logged-in user
  const [schedules, setSchedules] = useState([]);
  // Function to add a new schedule to Firestore and update the local state
  const handleSaveSchedule = async (scheduleEntries) => {
    if (!user) {
      console.log("No user logged in");
      return;
    }
  
    try {
      for (const entry of scheduleEntries) {
        // Ensure userEmail is not undefined
        if (!entry.userEmail) {
          console.error("User email is undefined", entry);
          throw new Error("User email is undefined.");
        }
  
        const docRef = await addDoc(collection(db, "schedule"), {
          ...entry,
          userEmail: entry.userEmail,
        });
  
        setSchedules([
          ...schedules,
          { ...entry, id: docRef.id },
        ]);
      }
      console.log("Schedule added successfully");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding schedule: ", error);
    }
  };
  useEffect(() => {
    const fetchSchedules = async () => {
      const q = query(collection(db, "schedule"), orderBy("day"));
      const querySnapshot = await getDocs(q);
      const fetchedSchedules = querySnapshot.docs.map((documentSnapshot) => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      }));
      setSchedules(fetchedSchedules);
    };

    fetchSchedules();
  }, []);

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await deleteDoc(doc(db, "schedule", scheduleId));
      setSchedules(schedules.filter((schedule) => schedule.id !== scheduleId));
      console.log("Schedule deleted successfully");
    } catch (error) {
      console.error("Error deleting schedule: ", error);
    }
  };

  const handleUpdateSchedule = async (updatedSchedule) => {
    try {
      const scheduleRef = doc(db, "schedule", updatedSchedule.id);
      await updateDoc(scheduleRef, {
        ...updatedSchedule,
      });
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === updatedSchedule.id
            ? { ...schedule, ...updatedSchedule }
            : schedule
        )
      );
      console.log("Schedule updated successfully");
    } catch (error) {
      console.error("Error updating schedule: ", error);
    }
  };

  return (
    <Layout
      content={
        <div className="p-5">
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mb-4"
            onClick={() => setShowModal(true)}
          >
            Add Schedule
          </button>
          {showModal && (
            <ScheduleForm
              onSaveSchedule={handleSaveSchedule}
              onClose={() => setShowModal(false)}
            />
          )}
          <ScheduleDisplay
            schedules={schedules}
            onDeleteSchedule={handleDeleteSchedule}
            onUpdateSchedule={handleUpdateSchedule}
          />
        </div>
      }
    />
  );
};

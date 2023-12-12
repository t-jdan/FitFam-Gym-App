import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export const AttendanceComponent = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceDocId, setAttendanceDocId] = useState(null);
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      const docRef = await addDoc(collection(db, "attendance"), {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        checkInTime: new Date(),
        checkOutTime: null
      });
      setAttendanceDocId(docRef.id);
      setMessage("You have successfully checked in."); // Set check-in message
      fetchAttendance();
    } catch (error) {
      console.error("Error during check-in: ", error);
      setMessage("Error during check-in."); // Set error message
    }
  };

  const handleCheckOut = async () => {
    try {
      const attendanceRef = doc(db, "attendance", attendanceDocId);
      await updateDoc(attendanceRef, {
        checkOutTime: new Date()
      });
      setAttendanceDocId(null);
      setMessage("You have successfully checked out."); // Set check-out message
      fetchAttendance();
    } catch (error) {
      console.error("Error during check-out: ", error);
      setMessage("Error during check-out."); // Set error message
    }
  };

  const fetchAttendance = async () => {
    try {
      const q = query(collection(db, "attendance"), orderBy("checkInTime", "desc"));
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email,
          checkInTime: data.checkInTime?.toDate().toLocaleString() || "No check-in time",
          checkOutTime: data.checkOutTime?.toDate().toLocaleString() || "No check-out time",
          userId: data.userId,
        };
      });
      setAttendanceRecords(records);
    } catch (error) {
      console.error("Error fetching attendance records: ", error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={handleCheckIn} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full mr-2">Check-In</button>
        <button onClick={handleCheckOut} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">Check-Out</button>
      </div>
      {message && <p className="text-center text-lg my-4">{message}</p>} {/* Display the message */}
      {/* Render attendance records in a grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {attendanceRecords.map(record => (
          <div key={record.id} className="bg-white p-4 rounded shadow">
            <p><strong>Email:</strong> {record.email}</p>
            <p><strong>Check-In Time:</strong> {record.checkInTime}</p>
            <p><strong>Check-Out Time:</strong> {record.checkOutTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

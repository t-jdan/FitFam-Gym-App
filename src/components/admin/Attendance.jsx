import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const q = query(collection(db, "attendance"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
        const records = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email,
            date: data.timestamp?.toDate().toLocaleString() || "No timestamp",
            userId: data.userid,
            status: data.status || "No status"
          };
        });

        setAttendanceRecords(records);
      } catch (error) {
        console.error("Error fetching attendance records: ", error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Trainer's Attendance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {attendanceRecords.map(record => (
          <div key={record.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{record.email}</h3>
              <p className="text-md text-gray-600">Date: {record.date}</p>
              <p className="text-md text-gray-600">User ID: {record.userId}</p>
              <p className={`text-md ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>Status: {record.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

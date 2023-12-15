import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
            userId: data.userid,
          };
        });

        setAttendanceRecords(records);
      } catch (error) {
        console.error("Error fetching attendance records: ", error);
      }
    };

    fetchAttendance();
  }, []);

  const filteredRecords = attendanceRecords.filter(record => 
    record.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Trainer's Attendance</h2>

      <input 
        type="text"
        placeholder="Search by Email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRecords.map(record => (
          <div key={record.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{record.email}</h3>
              <p className="text-md text-gray-600">Check-In: {record.checkInTime}</p>
              <p className="text-md text-gray-600">Check-Out: {record.checkOutTime}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

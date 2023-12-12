import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const ReportComponent = () => {
  const [trainers, setTrainers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Fetch trainers, equipment, and attendance data from Firestore
    const fetchData = async () => {
      const trainersSnapshot = await getDocs(collection(db, "trainers"));
      setTrainers(trainersSnapshot.docs.map(doc => doc.data()));

      const equipmentSnapshot = await getDocs(collection(db, "equipment"));
      setEquipment(equipmentSnapshot.docs.map(doc => doc.data()));

      const attendanceSnapshot = await getDocs(collection(db, "attendance"));
      setAttendance(attendanceSnapshot.docs.map(doc => doc.data()));
    };

    fetchData();
  }, []);

  const downloadCSV = (data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8," 
      + data.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    // Combine data or create separate downloads for trainers, equipment, and attendance
    const combinedData = [
      ["Trainers"],
      ...trainers.map(trainer => [trainer.name, trainer.specialization]),
      [],
      ["Equipment"],
      ...equipment.map(eq => [eq.name, eq.status]),
      [],
      ["Attendance"],
      ...attendance.map(att => [att.memberName, att.date, att.status])
    ];

    downloadCSV(combinedData, "report.csv");
  };

  return (
    <div>
      <button className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={handleDownload}>
        Download Report
      </button>
    </div>
  );
};

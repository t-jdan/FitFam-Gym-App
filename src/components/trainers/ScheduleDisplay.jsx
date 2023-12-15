import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const ScheduleDisplay = () => {
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      const querySnapshot = await getDocs(collection(db, "schedule"));
      setSchedules(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchSchedules();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-black font-bold py-2 px-4 text-left text-xl">Trainer Schedule</h2>
      <input 
        type="text"
        placeholder="Search by day..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          width: '100%', 
          boxSizing: 'border-box',
          border: '1px solid black', // Add this line for a black border
        }}
      />
      <div className='w-full grid grid-cols-4 gap-4' 
    
      >
        {schedules.filter(schedule => 
          schedule.day.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(schedule => (
          <div key={schedule.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '15px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#555', marginBottom: '10px' }}>Day: {schedule.day}</h3>
            <p><strong>Start Time:</strong> {schedule.startTime}</p>
            <p><strong>End Time:</strong> {schedule.stopTime}</p>
            <p><strong>Trainer Email:</strong> {schedule.userEmail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

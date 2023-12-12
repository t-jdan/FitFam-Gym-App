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
      <h2>Trainer Schedule</h2>
      <input 
        type="text"
        placeholder="Search by day..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}
      />
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
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

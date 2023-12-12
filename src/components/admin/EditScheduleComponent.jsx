import React, { useState, useEffect } from 'react';

export const EditScheduleForm = ({ schedule, onUpdateSchedule, onClose }) => {
  const [updatedSchedule, setUpdatedSchedule] = useState(schedule);

  useEffect(() => {
    setUpdatedSchedule(schedule);
  }, [schedule]);

  const handleDayChange = (e) => {
    setUpdatedSchedule({ ...updatedSchedule, day: e.target.value });
  };

  const handleStartTimeChange = (e) => {
    setUpdatedSchedule({ ...updatedSchedule, startTime: e.target.value });
  };

  const handleStopTimeChange = (e) => {
    setUpdatedSchedule({ ...updatedSchedule, stopTime: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUpdatedSchedule({ ...updatedSchedule, userEmail: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSchedule(updatedSchedule);
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Schedule</h2>
        
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={updatedSchedule.userEmail || ''}
            onChange={handleEmailChange}
            className="border p-2 rounded w-full"
            placeholder="Enter user's email"
          />
        </label>

        <label className="block mb-2">
          Day:
          <select value={updatedSchedule.day} onChange={handleDayChange} className="border p-2 rounded w-full">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>

        <label className="block mb-2">
          Start Time:
          <input type="time" value={updatedSchedule.startTime} onChange={handleStartTimeChange} className="border p-2 rounded w-full" />
        </label>

        <label className="block mb-2">
          Stop Time:
          <input type="time" value={updatedSchedule.stopTime} onChange={handleStopTimeChange} className="border p-2 rounded w-full" />
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

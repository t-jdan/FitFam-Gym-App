import React, { useState } from 'react';
import { auth } from '../../../firebaseConfig';

export const ScheduleForm = ({ onSaveSchedule, onClose }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayChange = (day) => {
    setSelectedDays(prevDays =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleTimeChange = (day, timeType, value) => {
    setTimeSlots(prevSlots => ({
      ...prevSlots,
      [day]: { ...prevSlots[day], [timeType]: value }
    }));
  };

  const handleSubmit = () => {
    // Construct an array of schedule entries for each selected day
    const scheduleEntries = selectedDays.map(day => ({
      userId: auth.currentUser.uid, // Get the current logged-in user's ID
      day: day,
      startTime: timeSlots[day]?.start || "",
      stopTime: timeSlots[day]?.end || "",
    }));

    onSaveSchedule(scheduleEntries); // Pass the array to the parent's onSaveSchedule handler
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Set Schedule</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                />
                {day}
              </label>
            ))}
          </div>
          {selectedDays.map((day) => (
            <div key={day} className="mb-3">
              <label className="block mb-1">{day}:</label>
              <div className="flex gap-2">
                <input
                  type="time"
                  className="border p-2 rounded w-full"
                  value={timeSlots[day]?.start || ""}
                  onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                />
                <input
                  type="time"
                  className="border p-2 rounded w-full"
                  value={timeSlots[day]?.end || ""}
                  onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

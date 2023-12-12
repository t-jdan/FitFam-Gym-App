import React, { useState } from 'react';

export const ScheduleForm = ({ onSaveSchedule, onClose }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [scheduledUserEmail, setScheduledUserEmail] = useState('');
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    let newErrors = {};
    if (!scheduledUserEmail) newErrors.email = "User email is required";
    if (selectedDays.length === 0) newErrors.days = "At least one day must be selected";
    for (const day of selectedDays) {
      if (!timeSlots[day]?.start) newErrors[`${day}-start`] = "Start time is required";
      if (!timeSlots[day]?.end) newErrors[`${day}-end`] = "End time is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const scheduleEntries = selectedDays.map(day => ({
      userEmail: scheduledUserEmail,
      day: day,
      startTime: timeSlots[day]?.start || "",
      stopTime: timeSlots[day]?.end || "",
    }));

    onSaveSchedule(scheduleEntries);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Set Schedule</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">User Email:</label>
            <input
              type="email"
              className={`border p-2 rounded w-full ${errors.email ? 'border-red-500' : ''}`}
              value={scheduledUserEmail}
              onChange={(e) => setScheduledUserEmail(e.target.value)}
              placeholder="Enter user's email"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
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
          {errors.days && <div className="text-red-500 text-sm mb-2">{errors.days}</div>}
          {selectedDays.map((day) => (
            <div key={day} className="mb-3">
              <label className="block mb-1">{day}:</label>
              <div className="flex gap-2">
                <input
                  type="time"
                  className={`border p-2 rounded w-full ${errors[`${day}-start`] ? 'border-red-500' : ''}`}
                  value={timeSlots[day]?.start || ""}
                  onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                />
                {errors[`${day}-start`] && <div className="text-red-500 text-sm">{errors[`${day}-start`]}</div>}
                <input
                  type="time"
                  className={`border p-2 rounded w-full ${errors[`${day}-end`] ? 'border-red-500' : ''}`}
                  value={timeSlots[day]?.end || ""}
                  onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                />
                {errors[`${day}-end`] && <div className="text-red-500 text-sm">{errors[`${day}-end`]}</div>}
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold              py-2 px-4 rounded"
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
  

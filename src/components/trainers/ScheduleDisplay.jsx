import React, { useState } from 'react';
import { Trash2, Edit2 } from "lucide-react";
import { EditScheduleForm } from './EditScheduleComponent' ; // Import the EditScheduleForm component

export const ScheduleDisplay = ({ schedules, onDeleteSchedule, onUpdateSchedule }) => {
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
  };

  const handleUpdate = (updatedScheduleData) => {
    onUpdateSchedule({ ...editingSchedule, ...updatedScheduleData });
    setEditingSchedule(null);
  };

  const handleCloseEdit = () => {
    setEditingSchedule(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-6">Scheduled Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules.map(schedule => (
          <div key={schedule.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Day: {schedule.day}</h3>
            <p className="text-md mb-2"><strong>Start Time:</strong> {schedule.startTime}</p>
            <p className="text-md mb-2"><strong>Stop Time:</strong> {schedule.stopTime}</p>
            <button onClick={() => handleEdit(schedule)}>
              <Edit2 className="text-blue-500 hover:text-blue-700" />
            </button>
            <button onClick={() => onDeleteSchedule(schedule.id)}>
              <Trash2 className="text-red-500 hover:text-red-700 ml-2" />
            </button>
          </div>
        ))}
      </div>

      {editingSchedule && (
        <EditScheduleForm 
          schedule={editingSchedule} 
          onUpdateSchedule={handleUpdate} 
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the import path as necessary
import { AttendanceCard } from './AttendanceCard';

export const AttendanceComponent = () => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const openCard = () => {
        setCurrentDateTime(new Date()); // Update the time whenever the card is opened
        setIsCardOpen(true);
    };

    const handleCancel = () => {
        setIsCardOpen(false);
    };

    const handleTakeAttendance = async () => {
        try {
            await addDoc(collection(db, "attendance"), {
                timestamp: currentDateTime
            });
            setIsCardOpen(false);
        } catch (error) {
            console.error("Error recording attendance: ", error);
        }
    };

    return (
        <div>
            <div className='mb-4'>
          <AttendanceCard />
        </div>
            <button onClick={openCard} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                Add Attendance
            </button>
            {isCardOpen && (
                <div className="card bg-white p-4 rounded-lg shadow-lg">
                    <p>Current Date and Time: {currentDateTime.toLocaleString()}</p>
                    <button onClick={handleTakeAttendance} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Take
                    </button>
                    <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};



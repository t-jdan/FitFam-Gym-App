import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';

export const CompetitionCard = ({ competition }) => {
    const [participating, setParticipating] = useState(false);
    const [calories, setCalories] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const [showCaloriesForm, setShowCaloriesForm] = useState(false);
    const [error, setError] = useState('');
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        checkParticipation();
    }, [userId, competition.id]);

    const checkParticipation = async () => {
        if (!userId) return;

        try {
            const participantRef = doc(db, `competition/${competition.id}/participants`, userId);
            const docSnap = await getDoc(participantRef);
            if (docSnap.exists()) {
                setParticipating(true);
                setTotalCalories(calculateTotalCalories(docSnap.data().dailyCalories));
            }
        } catch (error) {
            console.error("Error checking participation: ", error);
        }
    };

    const calculateTotalCalories = (dailyCalories) => {
        return Object.values(dailyCalories).reduce((total, current) => total + current, 0);
    };

    const handleParticipate = () => {
        setShowCaloriesForm(true);
    };

    const handleCaloriesChange = (e) => {
        setCalories(Number(e.target.value));
    };

    const handleCaloriesSubmit = async (e) => {
        e.preventDefault();
        if (!calories) return;

        try {
            const date = new Date().toISOString().split('T')[0];
            const participantRef = doc(db, `competition/${competition.id}/participants`, userId);

            const docSnap = await getDoc(participantRef);
            if (!docSnap.exists()) {
                await setDoc(participantRef, {
                    userId: userId,
                    dailyCalories: { [date]: calories },
                    joinedDate: new Date()
                });
            } else {
                await updateDoc(participantRef, {
                    [`dailyCalories.${date}`]: calories
                });
            }

            setParticipating(true);
            setShowCaloriesForm(false);
            setTotalCalories(prev => prev + calories);
            setError(''); // Clear any existing error
        } catch (error) {
            setError("Error updating calories. Please try again.");
            console.error("Error updating calories: ", error);
        }
    };

    const handleDropOut = async () => {
        try {
            await deleteDoc(doc(db, `competition/${competition.id}/participants`, userId));
            setParticipating(false);
            setTotalCalories(0);
        } catch (error) {
            console.error("Error dropping out of competition: ", error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{competition.name}</h3>
            <p className="text-gray-600">Prize: {competition.prize}</p>
            <p className="text-gray-600">Rules: {competition.rules}</p>
            <p className="text-gray-600">Start Date: {competition.startDate}</p>
            <p className="text-gray-600">End Date: {competition.endDate}</p>
            {!participating ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleParticipate}>Participate</button>
            ) : (
                <>
                    <div>Total Calories Burned: {totalCalories}</div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleDropOut}>Drop Out</button>
                </>
            )}

            {showCaloriesForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
                        <form onSubmit={handleCaloriesSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Calories Burned
                                </label>
                                <input
                                    type="number"
                                    value={calories}
                                    onChange={handleCaloriesChange}
                                    className="border p-2 rounded w-full"
                                    placeholder="Enter calories burned"
                                    min="0"
                                />
                            </div>
                            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={calories <= 0}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                                onClick={() => setShowCaloriesForm(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


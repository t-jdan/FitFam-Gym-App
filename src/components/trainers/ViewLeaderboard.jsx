import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';



export const ViewLeaderboard = ({ competitionId }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, [competitionId]);

  const fetchParticipants = async () => {
    try {
      const q = query(collection(db, `competition/${competitionId}/participants`)); // Adjusted path to participants
      const querySnapshot = await getDocs(q);
      const participantsData = [];

      for (const participantDoc of querySnapshot.docs) {
        const data = participantDoc.data();
        const totalCalories = Object.values(data.dailyCalories).reduce((sum, current) => sum + current, 0);
        
        // Fetch user details based on userId
        const userRef = doc(db, "user_data", data.userId); // Assuming users are stored in 'users' collection
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          participantsData.push({ 
            userId: data.userId, 
            firstName: userData.firstName, 
            lastName: userData.lastName, 
            totalCalories 
          });
        }
      }

      participantsData.sort((a, b) => b.totalCalories - a.totalCalories);
      setParticipants(participantsData);
    } catch (error) {
      console.error("Error fetching participants: ", error);
    }
  };
  return (
    <div><h2 className="text-black font-bold py-2 px-4 text-left text-xl">Leaderboard</h2>
    <div>
      
      <table className="min-w-full leading-normal">
  <thead>
    <tr>
      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
        Rank
      </th>
      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
        Name
      </th>
      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
        Total Calories
      </th>
    </tr>
  </thead>
  <tbody>
    {participants.map((participant, index) => (
      <tr key={index}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{`${participant.firstName} ${participant.lastName}`}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{participant.totalCalories}</p>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
    </div>
  );
};



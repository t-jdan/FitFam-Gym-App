import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore';
import { Leaderboard } from './Leaderboard';

      export const CompetitionList = () => {
          const [competitions, setCompetitions] = useState([]);
          const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
        
          useEffect(() => {
            fetchCompetitions();
          }, []);
        
          const fetchCompetitions = async () => {
            try {
              const querySnapshot = await getDocs(collection(db, "competition"));
              setCompetitions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
              console.error("Error fetching competitions: ", error);
            }
          };

          const handleCompetitionClick = (id) => {
            if (selectedCompetitionId === id) {
              // If the same competition is clicked again, hide the leaderboard
              setSelectedCompetitionId(null);
            } else {
              // If a different competition is clicked, show its leaderboard
              setSelectedCompetitionId(id);
            }
          };
        
          return (
            <div><h2 className="text-black font-bold py-2 px-4 text-left text-xl">Leaderboard</h2>
              <div className="flex flex-wrap justify-center">
                {competitions.map((competition) => (
                  <div 
                    key={competition.id} 
                    className="m-2 p-4 border rounded-lg cursor-pointer hover:shadow-lg"
                    onClick={() => handleCompetitionClick(competition.id)}
                  >
                    <h3 className="text-lg font-semibold">{competition.name}</h3>
                    <p>{competition.description}</p>
                  </div>
                ))}
              </div>
        
              {/* Render the Leaderboard only when a competition card is clicked */}
              {selectedCompetitionId && <Leaderboard competitionId={selectedCompetitionId} />}
            </div>
          );
      };

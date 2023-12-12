import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { CompetitionCard } from './CompetitionCard';
import { auth } from '../../../firebaseConfig'; // Assuming you are using Firebase Authentication

export const Competition = () => {
    const [competitions, setCompetitions] = useState([]);
    const [filteredCompetitions, setFilteredCompetitions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCompetitions();
    }, []);

    useEffect(() => {
        setFilteredCompetitions(
            competitions.filter(comp => 
                comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comp.prize.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, competitions]);

    const fetchCompetitions = async () => {
        const querySnapshot = await getDocs(collection(db, "competition"));
        setCompetitions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };


    return (
        <div className="container mx-auto mt-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Competitions</h1>
                
                <input 
                    type="text"
                    placeholder="Search competitions..."
                    className="border border-gray-300 p-2 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto" style={{ maxHeight: '600px' }}>
            {filteredCompetitions.map(comp => (
                <CompetitionCard 
                    key={comp.id} 
                    competition={comp} 
                />
                ))}
            </div>
        </div>
    );
};

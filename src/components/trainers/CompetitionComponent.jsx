import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { CompetitionForm } from "./CompetitionForm";
import { CompetitionCard } from "./CompetitionCard";

export const CompetitionComponent = () => {
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCompetition, setEditingCompetition] = useState(null);

  

  useEffect(() => {
    fetchCompetitions();
  }, []);

  useEffect(() => {
    setFilteredCompetitions(
      competitions.filter(
        (comp) =>
          comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.prize.toLowerCase().includes(searchTerm.toLowerCase()) // Adjust according to the fields you want to search by
      )
    );
  }, [searchTerm, competitions]);

  const fetchCompetitions = async () => {
    const querySnapshot = await getDocs(collection(db, "competition"));
    setCompetitions(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const openForm = () => setIsFormOpen(true); 
  const closeForm = () => setIsFormOpen(false);

  const handleNewCompetition = async (newComp) => {
    const docRef = await addDoc(collection(db, "competition"), newComp);
    setCompetitions([...competitions, { id: docRef.id, ...newComp }]);
    closeForm();
  };

  const handleDeleteCompetition = async (id) => {
    try {
      await deleteDoc(doc(db, "competition", id)); // Delete competition from Firestore
      setCompetitions(competitions.filter((comp) => comp.id !== id));
    } catch (error) {
      console.error("Error deleting competition: ", error);
    }
  };

  // Implement handleUpdateCompetition
  const handleUpdateCompetition = async (updatedComp) => {
    try {
      const compRef = doc(db, "competition", updatedComp.id);
      await updateDoc(compRef, updatedComp);

      // Update competition in local state
      setCompetitions(competitions.map((comp) => comp.id === updatedComp.id ? updatedComp : comp));
      closeForm();
      setEditingCompetition(null); // Reset editing competition after update
    } catch (error) {
      console.error("Error updating competition: ", error);
    }
  };

  // Implement handleEditCompetition
  const handleEditCompetition = (comp) => {
    setEditingCompetition(comp);
    openForm();
  };

   //
  return (
    <div className="container mx-auto mt-4 p-5">
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

      <button
        onClick={openForm}
        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
      >
        Create a Competition
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="card bg-white p-4 rounded-lg shadow-lg relative">
            <button
              onClick={closeForm}
              className="absolute top-0 right-0 m-2 text-lg font-bold"
            >
              ✕
            </button>
            <CompetitionForm onNewCompetition={handleNewCompetition} editingCompetition={editingCompetition} onUpdateCompetition={handleUpdateCompetition}  />
          </div>
        </div>
      )}

      <div className="container mx-auto mt-4">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto"
          style={{ maxHeight: "600px" }}
        >
          {filteredCompetitions.map((comp) => (
            <CompetitionCard key={comp.id} competition={comp}  onDelete={() => handleDeleteCompetition(comp.id)} 
            onUpdate={() => handleUpdateCompetition(comp)} onEdit={() => handleEditCompetition(comp)}/>
          ))}
        </div>
      </div>
    </div>
  );
};

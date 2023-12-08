import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { collection, getDocs, query,addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { RefreshCw,Trash2 } from 'lucide-react';

export const Table = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [equipmentID, setEquipmentID] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [maintenanceSchedule, setMaintenanceSchedule] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditMode, setIsEditMode] = useState(false); // New state to track edit mode
    const [currentEditingId, setCurrentEditingId] = useState(null); // State to track the ID of the equipment being edited

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "equipments")));
                const equipmentList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEquipment(equipmentList);
            } catch (error) {
                console.error("Error fetching equipment: ", error);
            } finally {
                setLoading(false);
            }
        };
        

        fetchEquipment();
    }, []);


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEquipment = equipment.filter(equipment => {
        return equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               equipment.equipmentID.toLowerCase().includes(searchQuery.toLowerCase()) ||
               equipment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
               equipment.maintenanceSchedule.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to open the modal in edit mode
    const openEditModal = (equipment) => {
        setIsEditMode(true);
        setCurrentEditingId(equipment.id);
        setEquipmentID(equipment.equipmentID);
        setName(equipment.name);
        setStatus(equipment.status);
        setMaintenanceSchedule(equipment.maintenanceSchedule);
        setIsModalOpen(true);
    };
    // Function to handle submit for both add and update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // Update logic
                await updateDoc(doc(db, "equipments", currentEditingId), {
                    equipmentID,
                    name,
                    status,
                    maintenanceSchedule
                });
                // Update the state with the new equipment data
                setEquipment(prevEquipment => prevEquipment.map(e => e.id === currentEditingId ? { id: currentEditingId, equipmentID, name, status, maintenanceSchedule } : e));
            } else {
                // Add new equipment logic
                const newDoc = await addDoc(collection(db, "equipments"), {
                    equipmentID,
                    name,
                    status,
                    maintenanceSchedule
                });
                setEquipment(prevEquipment => [
                    ...prevEquipment,
                    { id: newDoc.id, equipmentID, name, status, maintenanceSchedule }
                ]);
            }
            // Clear form and close modal
            setIsEditMode(false);
            setEquipmentID('');
            setName('');
            setStatus('');
            setMaintenanceSchedule('');
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding/updating equipment: ", error);
        }
    };


    // Function to delete equipment
    const deleteEquipment = async (equipmentId) => {
        try {
            await deleteDoc(doc(db, "equipments", equipmentId));
            setEquipment(prevEquipment => prevEquipment.filter(e => e.id !== equipmentId));
        } catch (error) {
            console.error("Error deleting equipment: ", error);
        }
    };

    const handleCloseModal = () => {
        // Clear the form and close the modal
        setEquipmentID('');
        setName('');
        setStatus('');
        setMaintenanceSchedule('');
        setIsModalOpen(false);
    };

      
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* Title "Trainers" */}
            <div className="w-full text-left mb-4">
                <h1 className="text-2xl font-bold text-black mb-4">Equipment</h1>
            </div>

            <div className="w-full flex justify-left ml-6">
                <button onClick={() => setIsModalOpen(true)} className="mt-8 mb-2 bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-full">
                    Add Equipment
                </button>
            </div>

             {/* Modal */}
             {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
                        <form onSubmit={handleSubmit}>
                            {/* Equipment ID */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Equipment ID
                                </label>
                                <input 
                                    type="text"
                                    value={equipmentID}
                                    onChange={(e) => setEquipmentID(e.target.value)}
                                    placeholder="Enter Equipment ID"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Equipment Name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            {/* Status */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Status
                                </label>
                                <input 
                                    type="text"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    placeholder="Enter Status"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            {/* Maintenance Schedule */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Maintenance Schedule
                                </label>
                                <input 
                                    type="text"
                                    value={maintenanceSchedule}
                                    onChange={(e) => setMaintenanceSchedule(e.target.value)}
                                    placeholder="Enter Maintenance Schedule"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-full mr-2">
                                Save Changes
                            </button>
                            <button 
                                type="button"
                                onClick={handleCloseModal}
                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="inline-block p-8 bg-black shadow-lg rounded-lg ml-4 text-white">
                {/* Header section with title and search bar */}
                <div className="flex justify-between mb-4">
                    {/* Title */}
                    <h1 className="text-lg font-semibold">Manage Equipment</h1>

                    {/* Search bar */}
                    <div className="flex items-center bg-gray-700 p-2 rounded">
                        <input
                            className="bg-transparent border-none outline-none p-2 w-full text-white"
                            type="text"
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={handleSearchChange} />
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 19l-3.5-3.5"></path>
                            <circle cx="11" cy="11" r="6"></circle>
                        </svg>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                            Equipment ID
                                        </th>
                                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                            Name
                                        </th>
                                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                            Status
                                        </th>
                                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                            Maintenance Date
                                        </th>
                                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                {filteredEquipment.map((equipment, index) => (
                    <tr key={index} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {equipment.equipmentID} {/* Adjusted to match Firestore field */}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            {equipment.name} {/* Adjusted to match Firestore field */}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            {equipment.status} {/* Adjusted to match Firestore field */}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            {equipment.maintenanceSchedule} {/* Adjusted to match Firestore field */}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            <button onClick={() => openEditModal(equipment)} className="bg-white hover:bg-indigo-700 text-black font-bold py-1 px-2 rounded-full">
                            <RefreshCw className="h-5 w-5" />
                            </button>
                            <button  onClick={() => deleteEquipment(equipment.id)} className="bg-white text-black hover:text-red-700 py-1 px-2 rounded-full" >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                        </td>
                    </tr>
                ))}
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';



export const CompetitionForm = ({onNewCompetition,onClose}) => {
    const [formData, setFormData] = useState({
        name: '',
        prize: '',
        rules: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onNewCompetition(formData); // Use the onNewCompetition prop to add the competition
            setFormData({
                name: '',
                prize: '',
                rules: '',
                startDate: '',
                endDate: ''
            });
            onClose(); // Close the form after successful submission
        } catch (error) {
            console.error("Error adding competition: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg">
            <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Competition Name"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text"
                name="prize"
                value={formData.prize}
                onChange={handleChange}
                placeholder="Prize"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea 
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="Rules"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input 
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                type="submit"
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Create Competition
            </button>
            
        </form>
    );
};


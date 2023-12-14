import React, { useState } from 'react';



export const CompetitionForm = ({onNewCompetition,onClose}) => {
    const [formData, setFormData] = useState({
        name: '',
        prize: '',
        rules: '',
        startDate: '',
        endDate: ''
    });
    const [errors, setErrors] = useState({});

    /**
     * The handleChange function updates the formData state by spreading the existing formData and
     * updating the value of the target input field.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * The function `validateForm` checks if certain form fields are empty and returns true if all
     * fields have values.
     * @returns The function `validateForm` is returning a boolean value. It returns `true` if there
     * are no errors in the form data, and `false` if there are errors.
     */
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Competition Name is required';
        if (!formData.prize.trim()) newErrors.prize = 'Prize is required';
        if (!formData.rules.trim()) newErrors.rules = 'Rules are required';
        if (!formData.startDate.trim()) newErrors.startDate = 'Start Date is required';
        if (!formData.endDate.trim()) newErrors.endDate = 'End Date is required';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    


    /**
     * The handleSubmit function is used to handle the form submission for adding a new competition,
     * including validation, calling the onNewCompetition prop, resetting the form data, and closing
     * the form.
     * @returns The function does not explicitly return anything.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
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
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
            />
            <input 
                type="text"
                name="prize"
                value={formData.prize}
                onChange={handleChange}
                placeholder="Prize"
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.prize ? 'border-red-500' : ''}`}
            />
            <textarea 
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="Rules"
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.prize ? 'border-red-500' : ''}`}
            ></textarea>
            <input 
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.prize ? 'border-red-500' : ''}`}
            />
            <input 
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.prize ? 'border-red-500' : ''}`}
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


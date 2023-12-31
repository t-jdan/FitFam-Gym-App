import React, { useState ,useEffect} from 'react';



export const CompetitionForm = ({onNewCompetition,onClose,onUpdateCompetition, editingCompetition}) => {
    const [formData, setFormData] = useState({
        name: '',
        prize: '',
        rules: '',
        startDate: '',
        endDate: ''
    });

    // Add errors state
  const [errors, setErrors] = useState({});


    // Pre-fill form data when editing a competition
    useEffect(() => {
        if (editingCompetition) {
            setFormData({
                name: editingCompetition.name,
                prize: editingCompetition.prize,
                rules: editingCompetition.rules,
                startDate: editingCompetition.startDate,
                endDate: editingCompetition.endDate
            });
        }
    }, [editingCompetition]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (editingCompetition) {
                // Update competition if editing
                await onUpdateCompetition({ ...formData, id: editingCompetition.id });
            } else {
                // Add new competition if not editing
                await onNewCompetition(formData);
            }
            setFormData({ name: '', prize: '', rules: '', startDate: '', endDate: '' });
            onClose(); // Close the form after successful submission
        } catch (error) {
            console.error("Error handling competition submission: ", error);
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
            />{errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
            <input 
                type="text"
                name="prize"
                value={formData.prize}
                onChange={handleChange}
                placeholder="Prize"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />{errors.prize && <div className="text-red-500 text-sm">{errors.prize}</div>}
            <textarea 
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="Rules"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>{errors.rules && <div className="text-red-500 text-sm">{errors.rules}</div>}
            <input 
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />{errors.startDate && <div className="text-red-500 text-sm">{errors.startDate}</div>}
            <input 
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />{errors.endDate && <div className="text-red-500 text-sm">{errors.endDate}</div>}
            <button 
                type="submit"
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                 {editingCompetition ? 'Update Competition' : 'Create Competition'}
            </button>
            
        </form>
    );
};



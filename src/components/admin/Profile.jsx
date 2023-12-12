import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { CircleUserRound } from 'lucide-react';

export const Profile = () => {
  const [user, setUser] = useState({});
  const [editableFields, setEditableFields] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'user_data', currentUser.uid);
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUser({ ...docSnap.data(), id: currentUser.uid });
            setEditableFields({
              firstName: docSnap.data().firstName || '',
              lastName: docSnap.data().lastName || '',
              phoneNumber: docSnap.data().phoneNumber || '',
              dateOfBirth: docSnap.data().dateOfBirth || '',
            });
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!editableFields.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!editableFields.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!editableFields.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = 'Invalid phone number';
    if (!editableFields.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    if (user && user.id) {
      const userRef = doc(db, 'user_data', user.id);
      await updateDoc(userRef, {
        firstName: editableFields.firstName,
        lastName: editableFields.lastName,
        phoneNumber: editableFields.phoneNumber,
        dateOfBirth: editableFields.dateOfBirth,
      });

      console.log('Profile updated');
    }
  };

  return (
    <div className="px-5 py-5 overflow-y-auto space-y-4 w-full h-full">
      <div className="text-2xl font-semibold">Profile Details</div>
      <div className="w-full flex gap-4">
        <div className="w-1/2 flex flex-col items-center space-y-3 h-[300px] border p-4 rounded-lg shadow-md">
          <CircleUserRound size={60} />
          <div className="w-full text-center">
            <div>
              Username: {user.firstName} {user.lastName}
            </div>
            <div>Contact no: {editableFields.phoneNumber}</div>
            <div>Email Address: {user.email}</div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 space-y-5 shadow-md p-4 rounded-lg border">
          <EditableField
            label="First Name"
            value={editableFields.firstName}
            onChange={(e) =>
              setEditableFields({
                ...editableFields,
                firstName: e.target.value,
              })
            }
            error={errors.firstName}
          />
          <EditableField
            label="Last Name"
            value={editableFields.lastName}
            onChange={(e) =>
              setEditableFields({ ...editableFields, lastName: e.target.value })
            }
            error={errors.lastName}
          />
          <EditableField
            label="Phone Number"
            value={editableFields.phoneNumber}
            onChange={(e) =>
              setEditableFields({
                ...editableFields,
                phoneNumber: e.target.value,
              })
            }
            error={errors.phoneNumber}
          />
          <EditableField
            label="Date of Birth"
            value={editableFields.dateOfBirth}
            onChange={(e) =>
              setEditableFields({
                ...editableFields,
                dateOfBirth: e.target.value,
              })
            }
            error={errors.dateOfBirth}
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 p-2 rounded-xl w-full text-white font-semibold hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EditableField = ({ label, value, onChange, error }) => {
  return (
    <div className="flex flex-col items-start w-full space-y-2">
      <span>{label}</span>
      <input
        type={label === 'Date of Birth' ? 'date' : label === 'Phone Number' ? 'tel' : 'text'}
        value={value}
        onChange={onChange}
        className={`p-2 rounded-xl w-full border ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>} {/* Display error message */}
    </div>
);
};    

import React, { useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebaseConfig';

export const Complaint = () => {
  const [complaint, setComplaint] = useState('');
  const [user] = useAuthState(auth); // Assuming you are using Firebase Authentication

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to submit a complaint.');
      return;
    }

    try {
      await addDoc(collection(db, "complaint"), {
        userEmail: user.email, // Current user's email
        complaint: complaint,
        timestamp: serverTimestamp() // Adds a server-side timestamp
      });

      alert('Complaint submitted successfully.');
      setComplaint(''); // Clear the form
    } catch (error) {
      console.error('Error submitting complaint: ', error);
      alert('Error submitting complaint.');
    }
  };

  return (
    <div className="complaint-container">
      <h2 className="text-black font-bold py-2 px-4 mb-10">Submit Your Complaint</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <textarea
          className="complaint-textarea"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Type your complaint here..."
        />
        <button type="submit" className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full mr-2">Submit Complaint</button>
      </form>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Layout1 } from "../../components/trainers/Layout1";

export const Complaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "complaint"));
      const fetchedComplaints = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(fetchedComplaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const formatDate = (timestamp) => {
    return timestamp.toDate().toLocaleString();
  };

  return (
    <Layout1 content={
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Complaints</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Complaint</h3>
              <p className="text-gray-600">{complaint.complaint}</p>
              <p className="text-gray-600">Date: {formatDate(complaint.timestamp)}</p>
              <p className="text-gray-600">User Email: {complaint.userEmail}</p>
            </div>
          ))}
        </div>
      </div>}
    />
  );
};

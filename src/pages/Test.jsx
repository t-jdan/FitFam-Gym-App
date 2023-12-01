import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const TestPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "admin")));
        const adminList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdmins(adminList);
      } catch (error) {
        console.error("Error fetching admins: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admins</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {/* Render your admin data here */}
            {admin.name} - {admin.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;

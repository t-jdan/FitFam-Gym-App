import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const RegularCard = ({ title, content }) => {
  const [trainers, setTrainers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(title);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "trainers")));
        const adminList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(adminList);
      } catch (error) {
        console.error("Error fetching trainers: ", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchEquipments = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "equipments"))
        );
        const equipmentList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEquipment(equipmentList);
      } catch (error) {
        console.error("Error fetching equipments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
    fetchTrainers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col w-1/2 h-[200px] w-[200px] items-center space-x-2 border p-4 rounded-lg border shadow-md">
        <div className="font-bold">{title}</div>
        <div>
          <p className="text-center text-3xl">
            {title === "Trainers" && trainers.length}
            {title === "Equipment" && equipment.length}
          </p>
        </div>
      </div>
    </>
  );
};

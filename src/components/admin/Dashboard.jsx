// import { useEffect, useState } from "react";
// import { auth } from "../../firebaseConfig";
// import { HorizontalCard } from "./HorizontalCard";
// import { RegularCard } from "./RegularCard";

// export const Dashboard = () => {
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in, you can set user details here
//         setUser(user);
//       } else {
//         // User is signed out
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       <div className="px-5 py-5 overflow-y-auto space-y-4 w-3/4 mx-auto">
//         <div>
//         </div>
//         <div className="w-full h-auto flex items-center space-x-4">
//         </div>
//       </div>
//     </>
//   );
// };
import { useEffect, useState } from "react";
import { RegularCard } from "./RegularCard";
import { HorizontalCard } from "./HorizontalCard";
import { auth, db } from "../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const Dashboard = () => {
  const [user, setUser] = useState({});
  const [competitions, setCompetitions] = useState([]);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    const competitionsRef = collection(db, "competition");
    const unsubscribeCompetitions = onSnapshot(competitionsRef, (snapshot) => {
      setCompetitions(snapshot.docs.map((doc) => doc.data().name));
    });

    const equipmentRef = collection(db, "equipments");
    const unsubscribeEquipment = onSnapshot(equipmentRef, (snapshot) => {
      setEquipment(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeCompetitions();
      unsubscribeEquipment();
    };
  }, []);

  return (
    <div className="px-5 py-5 overflow-y-auto space-y-4 w-3/4 mx-auto">
      {/* ... rest of the dashboard layout ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RegularCard title="Total Equipment" value={equipment.length} />
        <RegularCard
          title="Active Equipment"
          value={equipment.filter((e) => e.status === "active").length}
        />
        <RegularCard
          title="Upcoming Competitions"
          value={competitions.length}
        />

        <HorizontalCard title="Current Competitions" list={competitions} />
        <HorizontalCard
          title="Equipment Status"
          list={equipment.map((e) => `${e.name}: ${e.status}`)}
        />
      </div>
    </div>
  );
};

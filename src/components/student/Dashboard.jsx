import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { HorizontalCard } from "./HorizontalCard";
import { RegularCard } from "./RegularCard";

export const Dashboard = () => {
  const [user, setUser] = useState({});
  const [userCompetitions, setUserCompetitions] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserCompetitions(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserCompetitions = async (userId) => {
    try {
      const q = query(collection(db, "competition"), where("participants", "array-contains", userId));
      const querySnapshot = await getDocs(q);
      const competitions = querySnapshot.docs.map(doc => doc.data());
      setUserCompetitions(competitions);
    } catch (error) {
      console.error("Error fetching user competitions: ", error);
    }
  };

  return (
    <>
      <div className="px-5 py-5 overflow-y-auto space-y-4 w-3/4 mx-auto">
        <div>
          <HorizontalCard name={auth.currentUser?.displayName} />
        </div>
        <div>
          <RegularCard title="Number of Competitions" content={`You are participating in ${userCompetitions.length} competitions`} />
        </div>
        <div>
          <div className="mt-5">
            <h2 className="text-xl font-semibold mb-3">Your Competitions</h2>
            {userCompetitions.map((comp, index) => (
              <RegularCard key={index} title={comp.name} content={comp.description} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

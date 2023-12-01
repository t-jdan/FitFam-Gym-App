import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { HorizontalCard } from "./HorizontalCard";
import { RegularCard } from "./RegularCard";

export const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, you can set user details here
        setUser(user);
      } else {
        // User is signed out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="px-5 py-5 overflow-y-auto space-y-4 w-3/4 mx-auto">
        <div>
          <HorizontalCard name={auth.currentUser?.displayName} />
        </div>
        <div className="w-full h-auto flex items-center space-x-4">
          <RegularCard title={"Trainers"} content={[]} />
          <RegularCard title={"Equipment"} content={[]} />
        </div>
      </div>
    </>
  );
};

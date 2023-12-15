import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { HorizontalCard } from "../student/HorizontalCard";
import { RegularCard } from "../admin/RegularCard";
// import { RegularCard } from "./RegularCard";

export const Dashboard1 = () => {
  const [user, setUser] = useState({});
  const [showAttendancePrompt, setShowAttendancePrompt] = useState(false);
  const [userCompetitions, setUserCompetitions] = useState([]);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, you can set user details here
        setUser(user);
        fetchUserCompetitions(user.uid);
      

         // Show the attendance prompt after 5 seconds
         const timeout = setTimeout(() => {
          setShowAttendancePrompt(true);
        }, 10000);
        // Clear the timeout when the component unmounts or when the prompt is closed manually
        return () => clearTimeout(timeout);
      } else {
        // User is signed out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleCloseAttendancePrompt = () => {
    // Close the attendance prompt when the user clicks the close button
    setShowAttendancePrompt(false);
  };
  const fetchUserCompetitions = async (userId) => {
    try {
      const q = query(collection(db, "competition"));
      const querySnapshot = await getDocs(q);
      const competitions = querySnapshot.docs.map(doc => doc.data());
      setUserCompetitions(competitions);
      console.log(competitions)
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
        <div className="w-full h-auto flex items-center space-x-4">
        
          <RegularCard title="Available Competitions" value={`(${userCompetitions?.length})`} />
        
        
        </div>
      </div>
       {/* Attendance Prompt Modal */}
       {showAttendancePrompt && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
              <h2 className="text-2xl font-bold mb-4">
                Do not forget to take your attendance
              </h2>
              {/* Additional information or buttons related to attendance can be added here */}
              <button
                onClick={handleCloseAttendancePrompt}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </>
  );
};

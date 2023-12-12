// import { CircleUserRound, User, UserRound } from "lucide-react";
// import { auth } from "../../../firebaseConfig";
// import { useEffect, useState } from "react";
// import { updateProfile } from "firebase/auth";

// export const Profile1 = () => {
//   const [newUsername, setNewUsername] = useState(auth.currentUser?.displayName);
//   const [newContact, setNewContact] = useState(auth.currentUser?.phoneNumber);
//   const [user, setUser] = useState({});

//   console.log(auth.currentUser);
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
//       <div className="px-5 py-5 overflow-y-auto space-y-4 w-full h-full">
//         <div>Profile Details</div>
//         <div className="w-full h-full flex gap-4">
//           <div className="w-1/2">
//             <div className="flex flex-col items-center space-y-3 h-[300px] w-auto items-center space-x-2 border p-4 rounded-lg border shadow-md">
//               <div>
//                 <CircleUserRound size={60} />
//               </div>
//               <div className="w-full text-center space-x-">
//                 <div>Username: {user?.displayName}</div>
//                 <div>Contact no: {user?.phoneNumber}</div>
//                 <div>Email Address: {user?.email}</div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col h-auto shadow-md items-center space-x-2 border p-4 rounded-lg border">
//             <div className="flex flex-col items-center space-y-5">
//               <div className="flex flex-col items-start w-[400px] space-y-2">
//                 <span>Username*</span>
//                 <input
//                   value={newUsername}
//                   onChange={(e) => setNewUsername(e.target.value)}
//                   className="p-2 rounded-xl w-full"
//                 />
//               </div>
//               <div className="flex flex-col items-start w-[400px] space-y-2">
//                 <span>Contact No*</span>
//                 <input
//                   value={newContact}
//                   onChange={(e) => setNewContact(e.target.value)}
//                   className="p-2 rounded-xl w-full"
//                 />
//               </div>
//               <div className="flex flex-col items-start w-[400px] space-y-2">
//                 <span>Email Address</span>
//                 <input
//                   disabled
//                   value={user?.email}
//                   className="p-2 rounded-xl w-full"
//                 />
//               </div>
//               <div className="w-[400px]">
//                 <button className="bg-[#A30A00] p-2 rounded-xl w-full text-white font-semibold">
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
import { CircleUserRound } from "lucide-react";
import { auth, db } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { updatePhoneNumber, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const Profile1 = () => {
  const [newUsername, setNewUsername] = useState(auth.currentUser?.displayName);
  const [newContact, setNewContact] = useState(auth.currentUser?.phoneNumber);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'user_data', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('No such document!');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (user && user.uid) {
      const userRef = doc(db, "user_data", user.uid);
      try {
        await updateDoc(userRef, {
          displayName: newUsername,
          phoneNumber: newContact,
        });

        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  console.log("uase", userData)

  return (
    <div className="px-5 py-5 overflow-y-auto space-y-6 w-full h-full bg-white">
      <h1 className="text-2xl font-semibold text-gray-800">Profile Details</h1>
      <div className="flex gap-6">
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          <div className="flex flex-col items-center space-y-4">
            <CircleUserRound size={80} className="text-blue-600" />
            <div className="text-center">
              <p className="text-lg font-medium">
                Username: {user?.displayName}
              </p>
              <p className="text-lg">Contact no: {userData?.phoneNumber}</p>
              <p className="text-lg">Email Address: {user?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Username*</label>
              <input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Contact No*</label>
              <input
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Email Address</label>
              <input
                disabled
                value={user?.email}
                className="p-2 border rounded-lg w-full focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleSave()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg w-full transition duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

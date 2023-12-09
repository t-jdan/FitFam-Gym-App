import { CircleUserRound, User, UserRound } from "lucide-react";
import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";

export const Profile1 = () => {
  const [newUsername, setNewUsername] = useState(auth.currentUser?.displayName);
  const [newContact, setNewContact] = useState(auth.currentUser?.phoneNumber);
  const [user, setUser] = useState({});

  console.log(auth.currentUser);
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
      <div className="px-5 py-5 overflow-y-auto space-y-4 w-full h-full">
        <div>Profile Details</div>
        <div className="w-full h-full flex gap-4">
          <div className="w-1/2">
            <div className="flex flex-col items-center space-y-3 h-[300px] w-auto items-center space-x-2 border p-4 rounded-lg border shadow-md">
              <div>
                <CircleUserRound size={60} />
              </div>
              <div className="w-full text-center space-x-">
                <div>Username: {user?.displayName}</div>
                <div>Contact no: {user?.phoneNumber}</div>
                <div>Email Address: {user?.email}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-auto shadow-md items-center space-x-2 border p-4 rounded-lg border">
            <div className="flex flex-col items-center space-y-5">
              <div className="flex flex-col items-start w-[400px] space-y-2">
                <span>Username*</span>
                <input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="p-2 rounded-xl w-full"
                />
              </div>
              <div className="flex flex-col items-start w-[400px] space-y-2">
                <span>Contact No*</span>
                <input
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  className="p-2 rounded-xl w-full"
                />
              </div>
              <div className="flex flex-col items-start w-[400px] space-y-2">
                <span>Email Address</span>
                <input
                  disabled
                  value={user?.email}
                  className="p-2 rounded-xl w-full"
                />
              </div>
              <div className="w-[400px]">
                <button className="bg-[#A30A00] p-2 rounded-xl w-full text-white font-semibold">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

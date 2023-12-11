import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { CircleUserRound } from "lucide-react";

export const Profile = () => {
  const [user, setUser] = useState({});
  const [editableFields, setEditableFields] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "user_data", currentUser.uid);
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUser({ ...docSnap.data(), id: currentUser.uid });
            setEditableFields({
              firstName: docSnap.data().firstName,
              lastName: docSnap.data().lastName,
              phoneNumber: docSnap.data().phoneNumber,
              dateOfBirth: docSnap.data().dateOfBirth,
            });
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (user && user.id) {
      const userRef = doc(db, "user_data", user.id);
      await updateDoc(userRef, {
        firstName: editableFields.firstName,
        lastName: editableFields.lastName,
        phoneNumber: editableFields.phoneNumber,
        dateOfBirth: editableFields.dateOfBirth,
      });

      console.log("saving");
    }
    console.log("no user", user);
  };

  return (
    <div className="px-5 py-5 overflow-y-auto space-y-4 w-full h-full">
      <div className="text-2xl font-semibold">Profile Details</div>
      <div className="w-full flex gap-4">
        <div className="w-1/2 flex flex-col items-center space-y-3 h-[300px] border p-4 rounded-lg shadow-md">
          <CircleUserRound size={60} />
          <div className="w-full text-center">
            <div>
              Username: {user.firstName} {user.lastName}
            </div>
            <div>Contact no: {editableFields.phoneNumber}</div>
            <div>Email Address: {user.email}</div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 space-y-5 shadow-md p-4 rounded-lg border">
          <EditableField
            label="First Name"
            value={editableFields.firstName}
            onChange={(e) =>
              setEditableFields({
                ...editableFields,
                firstName: e.target.value,
              })
            }
          />
          <EditableField
            label="Last Name"
            value={editableFields.lastName}
            onChange={(e) =>
              setEditableFields({ ...editableFields, lastName: e.target.value })
            }
          />
          <EditableField
            label="Phone Number"
            value={editableFields.phoneNumber}
            onChange={(e) =>
              setEditableFields({
                ...editableFields,
                phoneNumber: e.target.value,
              })
            }
          />
          <EditableField
            label="Date of Birth"
            value={editableFields.dateOfBirth}
            onChange={(e) =>
              setEditableFields({
                ...editableFields,
                dateOfBirth: e.target.value,
              })
            }
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 p-2 rounded-xl w-full text-white font-semibold hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EditableField = ({ label, value, onChange }) => {
  return label == "Date of Birth" ? (
    <div className="flex flex-col items-start w-full space-y-2">
      <span>{label}</span>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="p-2 rounded-xl w-full border"
      />
    </div>
  ) : label == "Phone Number" ? (
    <div className="flex flex-col items-start w-full space-y-2">
      <span>{label}</span>
      <input
        type="tel"
        value={value}
        onChange={onChange}
        className="p-2 rounded-xl w-full border"
      />
    </div>
  ) : (
    <div className="flex flex-col items-start w-full space-y-2">
      <span>{label}</span>
      <input
        value={value}
        onChange={onChange}
        className="p-2 rounded-xl w-full border"
      />
    </div>
  );
};

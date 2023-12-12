import React from "react";
import { Trash2, Edit2 } from "lucide-react";
import useUserStore from "../../store/useUserStore";

export const CompetitionCard = ({ competition, onDelete, onEdit }) => {
  const { user } = useUserStore();
  console.log(user)
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800">
        {competition.name}
      </h3>
      <p className="text-gray-600">Prize: {competition.prize}</p>
      <p className="text-gray-600">Rules: {competition.rules}</p>
      <p className="text-gray-600">Start Date: {competition.startDate}</p>
      <p className="text-gray-600">End Date: {competition.endDate}</p>
      {/* Icons */}

      {user.role == 1 || user.role == 0 ? (
        <>
          <button onClick={() => onEdit(competition)}>
            <Edit2 className="text-blue-500 hover:text-blue-700" />
          </button>
          <button onClick={() => onDelete(competition.id)}>
            <Trash2 className="text-red-500 hover:text-red-700 ml-2" />
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

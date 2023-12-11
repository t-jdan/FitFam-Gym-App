export const CompetitionCard = ({ competition }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{competition.name}</h3>
            <p className="text-gray-600">Prize: {competition.prize}</p>
            <p className="text-gray-600">Rules: {competition.rules}</p>
            <p className="text-gray-600">Start Date: {competition.startDate}</p>
            <p className="text-gray-600">End Date: {competition.endDate}</p>
        </div>
    );
};

export const RegularCard = ({ title, value }) => {
  console.log(title, value)
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-3">
      <div className="text-lg font-medium text-gray-700">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
};


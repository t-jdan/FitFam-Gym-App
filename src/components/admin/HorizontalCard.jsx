export const HorizontalCard = ({ title, list }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="text-lg font-medium text-gray-700 mb-2">{title}</div>
      <ul>
        {list?.map((item, index) => (
          <li key={index} className="text-gray-600">{item}</li>
        ))}
      </ul>
    </div>
  );
};



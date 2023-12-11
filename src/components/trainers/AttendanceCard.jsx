export const AttendanceCard = () => {
    return (
      <>
        <div className="flex items-center justify-center space-x-2 border px-2 py-8 rounded-lg shadow-md">
          <div className="w-3/4 flex flex-col items-start">
            <span className="font-bold text-lg">Please Take Note Of the Following</span>
            <span>
            Only take your attendance  when you are physically present in the gym: not on your way or you intend to attend. Honor code applies
            </span>
          </div>
          <div className="w-24 h-24">
            <img className="rounded-full w-full h-full bg-black object-cover" />
          </div>
        </div>
      </>
    );
  };
  
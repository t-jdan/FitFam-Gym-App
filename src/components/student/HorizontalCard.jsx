export const HorizontalCard = ({ name }) => {
    return (
      <>
        <div className="flex items-center justify-center space-x-2 border px-2 py-8 rounded-lg shadow-md">
          <div className="w-3/4 flex flex-col items-start">
            <span className="font-bold text-lg">Welcome {name}</span>
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,
              doloremque consequatur, similique voluptates quia recusandae
              corrupti accusantium voluptas nesciunt repellat dolores, explicabo
              ut suscipit quasi dignissimos! Quam ipsa iusto veniam placeat
              repellat alias. Cupiditate, alias eveniet perferendis suscipit quos
              velit!
            </span>
          </div>
          <div className="w-24 h-24">
            <img className="rounded-full w-full h-full bg-black object-cover" />
          </div>
        </div>
      </>
    );
  };
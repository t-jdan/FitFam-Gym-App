import DashboardPic from "../../assets/DashboardPic.jpeg"
export const HorizontalCard = ({ name }) => {
    return (
      <>
        <div className="flex items-center justify-center space-x-2 border px-2 py-8 rounded-lg shadow-md">
          <div className="w-3/4 flex flex-col items-start">
            <span className="font-bold text-lg">Welcome {name}.</span>
            <span>
            We are thrilled to have you on board. Fitfam is designed to
              help you stay healthy while connecting with the Ashesi community. Whether you're here for the amazing prices to be won during the competitions,track your fitness goals, or help your friends stay healthy,we've got you covered.
            </span>
          </div>
          <div className="w-24 h-24">
            <img className="rounded-full w-full h-full "
           
    
            src={DashboardPic}
            alt="Ashesi Logo"
          
            />
          </div>
        </div>
      </>
    );
  };
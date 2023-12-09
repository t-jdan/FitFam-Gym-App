import Sidebar1 from "./SideBar1";

export const Layout1 = ({ content }) => {
  return (
    <div className="w-screen h-screen flex items-start ">
      <Sidebar1 />
      {content}
    </div>
  );
};

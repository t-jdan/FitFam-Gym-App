import Sidebar from "./SideBar";

export const Layout = ({ content }) => {
  return (
    <div className="w-screen h-screen flex items-start ">
      <Sidebar />
      {content}
    </div>
  );
};

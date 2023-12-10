import { Dashboard } from "../../components/Dashboard";
import { Layout } from "../../components/Layout";

export const AdminDashboard = () => {
  return (
    <>
      <Layout content={<Dashboard/>}/>
    </>
  );
};

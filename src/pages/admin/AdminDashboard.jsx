import { Dashboard } from "../../components/admin/Dashboard";
import { Layout } from "../../components/admin/Layout";

export const AdminDashboard = () => {
  return (
    <>
      <Layout content={<Dashboard />} />
    </>
  );
};

import { Dashboard } from "../components/student/Dashboard";
import { Layout } from "../components/student/Layout";

export const StudentDashboard = () => {
  return (
    <>
      <Layout content={<Dashboard/>}/>
    </>
  );
};

import { Competition } from "../../components/student/Competition";
import { Dashboard } from "../../components/student/Dashboard";
import { Layout } from "../../components/student/Layout";

export const StudentDashboard = () => {
  return (
    // competetion
    // Workouts
    <>
      <Layout content={
        <Dashboard/>
      }/>
    </>
  );
};

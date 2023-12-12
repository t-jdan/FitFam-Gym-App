import {  CompetitionList } from "../../components/student/CompetitionList";
import { Layout } from "../../components/student/Layout";

export const GymLeaderboard = () => {
  return (
    <Layout 
      content={
        <>
          <CompetitionList />
          
        </>
      }
    />
  );
};

import { AttendanceComponent } from "../../components/trainers/AttendanceComponent";
import { Layout1 } from "../../components/trainers/Layout1";

export const TrainerAttendance = () => {
  return (
    <>
      <Layout1 content={<AttendanceComponent />} />
    </>
  );
};

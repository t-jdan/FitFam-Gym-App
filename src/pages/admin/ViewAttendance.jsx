import { Attendance } from "../../components/admin/Attendance";
import { Layout } from "../../components/admin/Layout";

export const ViewAttendance = () => {
  return (
    <>
      <Layout content={<Attendance />} />
    </>
  );
};

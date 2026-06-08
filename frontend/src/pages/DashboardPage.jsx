import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../config/axiosConfig";

import {
  setCourseStudentCount,
  setRevenue,
  setTopCourses,
  setLoading,
} from "../store/slices/analyticsSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { courseStudentCount, revenue, topCourses, loading } = useSelector(
    (state) => state.analytics,
  );

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      dispatch(setLoading(true));

      const countRes = await api.get("/analytics/course-student-count");

      const revenueRes = await api.get("/analytics/revenue");

      const topCoursesRes = await api.get("/analytics/top-courses");

      dispatch(setCourseStudentCount(countRes.data));
      dispatch(setRevenue(revenueRes.data));
      dispatch(setTopCourses(topCoursesRes.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const totalRevenue = revenue?.reduce(
    (acc, item) => acc + (item.totalRevenue || 0),
    0,
  );

  const totalEnrollments = courseStudentCount?.reduce(
    (acc, item) => acc + (item.totalStudents || 0),
    0,
  );

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* SPINNER */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border rounded p-4">
              <h2 className="font-semibold">Total Enrollments</h2>
              <p className="text-2xl font-bold">{totalEnrollments}</p>
            </div>

            <div className="border rounded p-4">
              <h2 className="font-semibold">Total Revenue</h2>
              <p className="text-2xl font-bold">₹{totalRevenue}</p>
            </div>
          </div>

         
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">
              Course Wise Student Count
            </h2>

            <table className="w-full border table-fixed">
              <thead>
                <tr className="text-left">
                  <th className="border p-2 w-1/2">Course</th>
                  <th className="border p-2 w-1/2">Students</th>
                </tr>
              </thead>

              <tbody>
                {courseStudentCount?.map((item, index) => (
                  <tr key={index} className="text-left">
                    <td className="border p-2">{item.courseName}</td>
                    <td className="border p-2">{item.totalStudents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">Revenue Per Course</h2>

            <table className="w-full border table-fixed">
              <thead>
                <tr className="text-left">
                  <th className="border p-2 w-1/2">Course</th>
                  <th className="border p-2 w-1/2">Revenue</th>
                </tr>
              </thead>

              <tbody>
                {revenue?.map((item, index) => (
                  <tr key={index} className="text-left">
                    <td className="border p-2">{item.courseName}</td>
                    <td className="border p-2">₹{item.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Top Courses</h2>

            <table className="w-full border table-fixed">
              <thead>
                <tr className="text-left">
                  <th className="border p-2 w-1/2">Course</th>
                  <th className="border p-2 w-1/2">Total Enrollments</th>
                </tr>
              </thead>

              <tbody>
                {topCourses?.map((item, index) => (
                  <tr key={index} className="text-left">
                    <td className="border p-2">{item.courseName}</td>
                    <td className="border p-2">{item.totalEnrollments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;

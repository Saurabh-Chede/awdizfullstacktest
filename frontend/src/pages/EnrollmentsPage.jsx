import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../config/axiosConfig";

import { setEnrollments, setLoading } from "../store/slices/enrollmentSlice";
import { setStudents } from "../store/slices/studentSlice";
import { setCourses } from "../store/slices/courseSlice";

const EnrollmentsPage = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.data);
  const courses = useSelector((state) => state.courses.data);
  const enrollments = useSelector((state) => state.enrollments.data);
  const loading = useSelector((state) => state.enrollments.loading);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));

      const studentsRes = await api.get("/students/get-students");
      const coursesRes = await api.get("/courses/get-courses");
      const enrollmentRes = await api.get("/enrollments/get-enrollments");

      dispatch(setStudents(studentsRes.data.students));
      dispatch(setCourses(coursesRes.data));
      dispatch(setEnrollments(enrollmentRes.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      await api.post("/enrollments/new-enrollment", formData);

      await fetchData();

      setFormData({
        studentId: "",
        courseId: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-5 relative">
      <h1 className="text-2xl font-bold mb-5">Enrollments</h1>

      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
        <select
          value={formData.studentId}
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          className="border p-2"
          disabled={loading}
        >
          <option value="">Select Student</option>
          {students?.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>

        <select
          value={formData.courseId}
          onChange={(e) =>
            setFormData({ ...formData, courseId: e.target.value })
          }
          className="border p-2"
          disabled={loading}
        >
          <option value="">Select Course</option>
          {courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 flex items-center gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Enroll"
          )}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Student</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Enrollment Date</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              enrollments?.map((enrollment) => (
                <tr key={enrollment._id} className="hover:bg-gray-50">
                  <td className="border p-2">{enrollment.studentId?.name}</td>

                  <td className="border p-2">{enrollment.courseId?.title}</td>

                  <td className="border p-2">{enrollment.status}</td>

                  <td className="border p-2">
                    {enrollment.enrollmentDate
                      ? new Date(enrollment.enrollmentDate).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          },
                        )
                      : "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentsPage;

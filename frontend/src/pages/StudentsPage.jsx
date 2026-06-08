import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

import {
  setStudents,
  addStudent,
  removeStudent,
  setLoading,
} from "../store/slices/studentSlice";

const StudentsPage = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.data);
  const loading = useSelector((state) => state.students.loading);

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // GET students
  const getStudents = async () => {
    try {
      dispatch(setLoading(true));

      const response = await api.get("/students/get-students");
      dispatch(setStudents(response.data.students));
    } catch (err) {
      toast.error("Failed to fetch students");
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const response = await api.post(
        "/students/create-student",
        studentData
      );

      dispatch(addStudent(response.data.student));

      toast.success("Student added successfully");

      setStudentData({
        name: "",
        email: "",
        mobile: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add student");
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // DELETE student
  const deleteStudentHandler = async (id) => {
    try {
      dispatch(setLoading(true));

      await api.delete(`/students/delete-student/${id}`);
      dispatch(removeStudent(id));

      toast.success("Student deleted successfully");
    } catch (err) {
      toast.error("Failed to delete student");
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Students</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
        <input
          name="name"
          placeholder="Name"
          value={studentData.name}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="email"
          placeholder="Email"
          value={studentData.email}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="mobile"
          placeholder="Mobile"
          value={studentData.mobile}
          onChange={handleChange}
          className="border p-2"
        />

        <button className="bg-black text-white px-4">
          Add
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center my-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="text-left">
              <th className="p-2 border-r">Name</th>
              <th className="p-2 border-r">Email</th>
              <th className="p-2 border-r">Mobile</th>
              <th className="p-2 border-r">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="p-2 border-r">{student.name}</td>
                <td className="p-2 border-r">{student.email}</td>
                <td className="p-2 border-r">{student.mobile}</td>

                <td className="p-2">
                  <button
                    onClick={() => deleteStudentHandler(student._id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentsPage;
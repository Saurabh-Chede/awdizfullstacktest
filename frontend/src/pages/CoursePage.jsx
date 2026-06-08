import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../config/axiosConfig";

import {
  setCourses,
  addCourse,
  removeCourse,
} from "../store/slices/courseSlice";

const CoursePage = () => {
  const dispatch = useDispatch();

  const { data: courses, loading } = useSelector(
    (state) => state.courses
  );

  const [courseData, setCourseData] = useState({
    title: "",
    category: "",
    fees: "",
    duration: "",
  });

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await api.get("/courses/get-courses");
      dispatch(setCourses(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/courses/create-course",
        courseData
      );

      dispatch(
        addCourse({
          _id: Date.now(),
          ...courseData,
        })
      );

      setCourseData({
        title: "",
        category: "",
        fees: "",
        duration: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourseHandler = async (id) => {
    try {
      await api.delete(`/courses/delete-course/${id}`);
      dispatch(removeCourse(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">
        Courses
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 mb-5 flex-wrap"
      >
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={courseData.title}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={courseData.category}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="fees"
          placeholder="Fees"
          value={courseData.fees}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={courseData.duration}
          onChange={handleChange}
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Add Course
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center my-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="text-left">
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Fees</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses?.map((course) => (
              <tr key={course._id}>
                <td className="border p-2">
                  {course.title}
                </td>

                <td className="border p-2">
                  {course.category}
                </td>

                <td className="border p-2">
                  ₹{course.fees}
                </td>

                <td className="border p-2">
                  {course.duration}
                </td>

                <td className="border p-2">
                  <button
                    onClick={() =>
                      deleteCourseHandler(course._id)
                    }
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

export default CoursePage;
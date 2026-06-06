import api from "../config/axiosConfig";
import { useEffect, useState } from "react";

function StudentsPage() {
  const [studentsData, setStudentsData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [students, setStudents] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setStudentsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStudents = async () => {
    try {
      const response = await api.get("/students/get-students");

      if (response.data.success) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/students/create-student",
        studentsData
      );

      console.log(response.data);

      setStudentsData({
        name: "",
        email: "",
        mobile: "",
      });

      getStudents();
    } catch (error) {
      console.log("Error creating student:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div>
      <h1>Students Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={studentsData.name}
            onChange={handleInputChange}
            placeholder="Enter Name"
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={studentsData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
          />
        </div>

        <br />

        <div>
          <label>Mobile</label>
          <br />
          <input
            type="text"
            name="mobile"
            value={studentsData.mobile}
            onChange={handleInputChange}
            placeholder="Enter Mobile"
          />
        </div>

        <br />

        <button type="submit">Create Student</button>
      </form>

      <hr />

      <h2>Students List</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((student) => (
          <div
            key={student._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{student.name}</h3>
            <p>Email: {student.email}</p>
            <p>Mobile: {student.mobile}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default StudentsPage;
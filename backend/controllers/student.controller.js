import StudentModel from "../models/student.schema.js";
import EnrollmentModel from "../models/enrollment.schema.js"

export const createStudent = async (req, res) => {
    try{
        const { name, email, mobile } = req.body;
        if(!name || !email || !mobile){
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const isEmailExist = await StudentModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const student = new StudentModel({ name, email, mobile });
        await student.save();
        res.status(201).json({ message: "Student created successfully", student }); 

    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Error creating student" });
    }
}

export const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching students",
    });
  }
};

export const getstudentById = async(req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student" });
    } 
}

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await StudentModel.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await EnrollmentModel.deleteMany({ studentId: id });

    await StudentModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Student and related enrollments deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({
      message: "Error deleting student",
    });
  }
};
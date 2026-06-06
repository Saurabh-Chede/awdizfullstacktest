import EnrollmentModel from "../models/enrollment.model.js";

export const enrollStudent = async(req, res) => {
    try {
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "Student ID and Course ID are required" });
        }

        const existingEnrollment = await EnrollmentModel.findOne({ student: studentId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Student is already enrolled in this course" });
        }

        const newEnrollment = new EnrollmentModel({ student: studentId, course: courseId });
        await newEnrollment.save();

        res.status(201).json({ message: "Student enrolled successfully", enrollment: newEnrollment });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling student", error });
    }
};
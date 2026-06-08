import EnrollmentModel from "../models/enrollment.schema.js";

export const enrollStudent = async(req, res) => {
    try {
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "Student ID and Course ID are required" });
        }

        const existingEnrollment = await EnrollmentModel.findOne({ studentId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Student is already enrolled in this course" });
        }

        const newEnrollment = new EnrollmentModel({ studentId, courseId });
        await newEnrollment.save();

        res.status(201).json({ message: "Student enrolled successfully", enrollment: newEnrollment });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling student", error });
    }
};

export const getEnrollments = async(req, res) => {
    try {
        const enrollments = await EnrollmentModel.find().populate("studentId").populate("courseId");    
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrollments", error });
    }   
};
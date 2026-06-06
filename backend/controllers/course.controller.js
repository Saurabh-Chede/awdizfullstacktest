import CourseModel from "../models/course.schema.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category, fees, duration } = req.body;

    if (!title || !category || !fees || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = new CourseModel({ title, category, fees, duration });
    await course.save();
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }       
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  } 
};



import EnrollmentModel from "../models/enrollment.schema.js";

export const getCourseStudentCount = async (req, res) => {
  try {
    const data = await EnrollmentModel.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },

      {
        $group: {
          _id: "$course._id",
          courseName: { $first: "$course.title" },
          totalStudents: { $sum: 1 },
        },
      },

      {
        $project: {
          _id: 0,
          courseName: 1,
          totalStudents: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenuePerCourse = async (req, res) => {
  try {
    const data = await EnrollmentModel.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $group: {
          _id: "$course._id",
          courseName: { $first: "$course.title" },
          totalRevenue: { $sum: "$course.fees" },
        },
      },
      {
        $project: {
          _id: 0,
          courseName: 1,
          totalRevenue: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopCourses = async (req, res) => {
  try {
    const data = await EnrollmentModel.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $group: {
          _id: "$course._id",
          courseName: { $first: "$course.title" },
          totalEnrollments: { $sum: 1 },
        },
      },
      { $sort: { totalEnrollments: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          courseName: 1,
          totalEnrollments: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

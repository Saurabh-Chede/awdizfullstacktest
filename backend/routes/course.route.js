import {Router} from "express";
import { createCourse, getCourseById,getCourses ,deleteCourse } from "../controllers/course.controller.js";

const router = Router();

router.post("/create-course", createCourse);
router.get("/get-courses", getCourses);
router.get("/get-course/:id", getCourseById);
router.delete("/delete-course/:id", deleteCourse);


export default router;
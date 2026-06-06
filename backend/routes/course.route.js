import {Router} from "express";
import { createCourse, getCourseById,getCourses } from "../controllers/course.controller.js";

const router = Router();

router.post("/create-course", createCourse);
router.get("/get-courses", getCourses);
router.get("/get-course/:id", getCourseById);


export default router;
import { Router } from "express";
import { createStudent , getStudents ,getstudentById, deleteStudent} from "../controllers/student.controller.js";

const router = Router();

router.post("/create-student", createStudent);
router.get("/get-students", getStudents);
router.get("/get-student/:id", getstudentById);
router.delete("/delete-student/:id", deleteStudent);


export default router;
import {Router} from "express";
import {enrollStudent, getEnrollments} from "../controllers/enrollment.controller.js";

const router = Router();

router.post("/new-enrollment", enrollStudent);
router.get("/get-enrollments", getEnrollments);

export default router;
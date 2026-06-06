import {Router} from "express";
import studentRoutes from "./student.route.js";
import courseRoutes from "./course.route.js";

const router = Router();

router.use("/students", studentRoutes);
router.use("/courses", courseRoutes);

export default router;
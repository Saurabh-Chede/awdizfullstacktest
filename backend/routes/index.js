import {Router} from "express";
import studentRouter from "./student.route.js";
import courseRouter from "./course.route.js";
import analyticsRouter from "./analytics.route.js";
import enrollmentRouter from "./enrollment.route.js";

const router = Router();

router.use("/students", studentRouter);
router.use("/courses", courseRouter);
router.use("/analytics", analyticsRouter);
router.use("/enrollments", enrollmentRouter);

export default router;
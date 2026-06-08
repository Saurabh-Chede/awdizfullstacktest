import {Router} from 'express';
import { getCourseStudentCount ,getRevenuePerCourse,getTopCourses } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/course-student-count', getCourseStudentCount);
router.get('/revenue', getRevenuePerCourse);
router.get('/top-courses', getTopCourses);

export default router;                                                                          
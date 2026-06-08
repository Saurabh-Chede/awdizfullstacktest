import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "./slices/studentSlice";
import courseReducer from "./slices/courseSlice";
import enrollmentReducer from "./slices/enrollmentSlice";
import analyticsReducer from "./slices/analyticsSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    courses: courseReducer,
    enrollments: enrollmentReducer,
    analytics: analyticsReducer,
  },
});
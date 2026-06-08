import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    courseStudentCount: [],
    revenue: [],
    topCourses: [],
    loading: false,
    error: null,
  },

  reducers: {
    setCourseStudentCount: (state, action) => {
      state.courseStudentCount = action.payload;
    },

    setRevenue: (state, action) => {
      state.revenue = action.payload;
    },

    setTopCourses: (state, action) => {
      state.topCourses = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCourseStudentCount,
  setRevenue,
  setTopCourses,
  setLoading,
  setError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
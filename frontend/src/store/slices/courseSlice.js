import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.data = action.payload;
    },

    addCourse: (state, action) => {
      state.data.push(action.payload);
    },

    removeCourse: (state, action) => {
      state.data = state.data.filter(
        (course) => course._id !== action.payload
      );
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
  setCourses,
  addCourse,
  removeCourse,
  setLoading,
  setError,
} = courseSlice.actions;

export default courseSlice.reducer;
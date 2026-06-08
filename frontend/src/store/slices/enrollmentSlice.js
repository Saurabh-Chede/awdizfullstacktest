import { createSlice } from "@reduxjs/toolkit";

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEnrollments: (state, action) => {
      state.data = action.payload;
    },

    createEnrollment: (state, action) => {
      state.data.push(action.payload);
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
  setEnrollments,
  createEnrollment,
  setLoading,
  setError,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
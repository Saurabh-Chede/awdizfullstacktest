import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStudents: (state, action) => {
      state.data = action.payload;
    },

    addStudent: (state, action) => {
      state.data.push(action.payload);
    },

    removeStudent: (state, action) => {
      state.data = state.data.filter(
        (student) => student._id !== action.payload
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
  setStudents,
  addStudent,
  removeStudent,
  setLoading,
  setError,
} = studentSlice.actions;

export default studentSlice.reducer;
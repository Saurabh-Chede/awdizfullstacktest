import mongoose, { Schema } from "mongoose";
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  mobile: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const StudentModel = mongoose.model("Student", studentSchema);
export default StudentModel;


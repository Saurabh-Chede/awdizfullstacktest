import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
    title : {
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    fees : {
        type:Number,
        required:true
    },
    duration : {
        type:String,
        required:true 
    },
    createdAt : {
        type:Date,
        default:Date.now()
    }   
})

const CourseModel = mongoose.model("Course", CourseSchema);
export default CourseModel;
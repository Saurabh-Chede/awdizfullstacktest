import mongoose, {Schema} from 'mongoose';

const EnrollmentSchema = new Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    enrollmentDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    }

})

const EnrollmentModel = mongoose.model('Enrollment', EnrollmentSchema);

export default EnrollmentModel;
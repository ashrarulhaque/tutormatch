import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    studentAvatar: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    comment: {
        type: String,
        required: true,
    },
},
{timestamps: true}
)

const Review = mongoose.model('Review', reviewSchema);
export default Review;
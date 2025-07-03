import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'cancelled'],
    default: 'ongoing'
  },
  online: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
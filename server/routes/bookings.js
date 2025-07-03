import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Get all bookings for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.params.studentId })
      .populate('teacherId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const booking = new Booking(req.body);
  
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking status
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (req.body.status) {
      booking.status = req.body.status;
    }
    
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
import express from 'express';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search teachers
router.get('/search', async (req, res) => {
  const { subject, location } = req.query;
  
  try {
    const query = {};
    
    if (subject) {
      query.subjects = { $regex: subject, $options: 'i' };
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    const teachers = await Teacher.find(query);
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
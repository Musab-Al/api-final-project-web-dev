const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Assignment routes
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ... other routes for assignments (same as the Grade routes provided earlier)
// Get a single assignment by ID
router.get('/:id', async (req, res) => {
    try {
      const assignment = await Assignment.findById(req.params.id)
        .populate('course'); // Populate course information for the assignment
      if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
      res.json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });
  
  // Create a new assignment for a specific course
  router.post('/:courseId/assignments', async (req, res) => {
    const { assignmentName, dueDate, description } = req.body;
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const assignment = new Assignment({ ...req.body, course: course._id });
    try {
      const newAssignment = await assignment.save();
      res.status(201).json(newAssignment);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update an assignment
  router.put('/:id', async (req, res) => {
    const { assignmentName, dueDate, description } = req.body;
    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        req.params.id,
        { $set: { assignmentName, dueDate, description } },
        
        { new: true }
      );
      if (!updatedAssignment) return res.status(404).json({ message: 'Assignment not found' });
      res.json(updatedAssignment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete an assignment
  router.delete('/:id', async (req, res) => {
    try {
      const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
      if (!deletedAssignment) return res.status(404).json({ message: 'Assignment not found' });
      res.json({ message: 'Assignment deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });
  

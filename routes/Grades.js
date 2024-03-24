const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');

// Get all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get a single grade by ID
router.get('/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json(grade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new grade
router.post('/', async (req, res) => {
  const grade = new Grade(req.body);
  try {
    const newGrade = await grade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Update a grade
router.put('/:id', async (req, res) => {
  try {
    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGrade) return res.status(404).json({ message: 'Grade not found' });
    res.json(updatedGrade);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a grade
router.delete('/:id', async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    if (!deletedGrade) return res.status(404).json({ message: 'Grade not found' });
    res.json({ message: 'Grade deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

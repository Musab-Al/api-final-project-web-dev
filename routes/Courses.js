const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Course = require('./models/course');
const Assignment = require('./models/assignment');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Get all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('assignments');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single course
app.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('assignments');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new course
app.post('/courses', async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a course
app.put('/courses/:id', async (req, res) => {
  const { courseName, instructorName, description, semester } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: { courseName, instructorName, description, semester } },
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json

    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete a course
app.delete('/courses/:id', async (req, res) => {
    
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
      if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
      res.json(deletedCourse);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

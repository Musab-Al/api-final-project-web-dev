const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/Courses');
const gradesRoutes = require('./routes/Grades');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Express middleware (removing redundant body-parser.urlencoded)
app.use(express.json());

// CORS with specific allowed origins
app.use(cors());
app.options('*', cors());

// Routes
app.get('/test', (req, res) => {
    // Send a response message
    res.send('This is a test route!');
  });
app.use('/auth', authRoutes);
app.use('/Courses', CoursesRoutes);
app.use('/Grades', GradesRoutes);
app.use('/Assignment', AssignmentRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Error handling for app listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
    .on('error', err => console.error('Server error:', err));

    

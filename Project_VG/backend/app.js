require('dotenv').config();
const connectDB = require('./config/connect');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173',  // your frontend
  credentials: true                 // if using cookies or auth headers
}));

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const tutorRoutes = require('./routes/tutorRoutes');

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'LearnSmart Backend API is running!' });
});

// Use route
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', userRoutes);
app.use('/api/tutor', tutorRoutes);

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Define routes here..before the error handlers

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to the database successfully');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

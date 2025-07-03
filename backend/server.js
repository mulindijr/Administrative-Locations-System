import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import locationRoutes from './routes/locations.js';

//App Configuration
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// Base Route
app.get('/', (req, res) => {
  res.send('Welcome to the Admin Locations System API');
});

// Routes
app.use('/api/locations', locationRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
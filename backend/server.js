import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';

//App Configuration
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Api Endpoints
app.get('/', (req, res) => {
  res.send('Welcome to the Admin Locations System API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const talentRoutes = require('./routes/talent');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/talent', talentRoutes);

// Health Check
app.get('/', (req, res) => res.send('ALT Hollywood Dream Star API Running'));

// DB Connection & Start
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alt_dream_star')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.error('Database connection failed:', err));

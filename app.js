const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');
const authController = require('./controllers/authController');
const adminRoutes = require('./routes/admin');

require('dotenv').config();

const express = require('express');
const router = express.Router();

const app = express();

sequelize.sync()
  .then(() => console.log('Database & tables created!'));


const User = require('./models/User');

app.use(express.json());

app.use('/api/auth', authRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

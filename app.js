const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');
const authController = require('./controllers/authController');

require('dotenv').config();

const express = require('express');
const router = express.Router();

const app = express();

const User = require('./models/User');

sequelize.sync({ force: true })
  .then(() => console.log('Database & tables created!'));


app.use(express.json());

app.use('/api/auth', authRoutes);

router.post('/login', authController.login);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const skillsRoutes = require('./routes/skills');

require('dotenv').config();

const express = require('express');

const app = express();

sequelize.sync({})
  .then(() => console.log('Database & tables created!'));


app.use(express.json());

app.use('/api/auth', authRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

app.use("/api/users", profileRoutes)

app.use("/api", skillsRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

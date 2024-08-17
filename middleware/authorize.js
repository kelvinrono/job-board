const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorize = (roles) => {
  return async (req, res, next) => {
    try {
        const headers = req.headers
        console.log("headers: ", headers)
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);

      const user = await User.findByPk(decoded.id);
      console.log("user available",user)

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authorize;

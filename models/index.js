const User = require('./User');
const Skills = require('./Skills');

// Define the many-to-many relationship
User.belongsToMany(Skills, { through: 'UserSkills', foreignKey: 'userId' });
Skills.belongsToMany(User, { through: 'UserSkills', foreignKey: 'skillId' });

module.exports = {
  User,
  Skills,
};

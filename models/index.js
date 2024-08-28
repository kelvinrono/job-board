const User = require('./User');
const Skills = require('./Skills');
const Job = require('./Job')
const JobApplication = require('./JobApplication');

// Define the many-to-many relationship
User.belongsToMany(Skills, { through: 'UserSkills', foreignKey: 'userId' });
Skills.belongsToMany(User, { through: 'UserSkills', foreignKey: 'skillId' });

User.hasMany(JobApplication, { foreignKey: 'applicantId' });
JobApplication.belongsTo(User, { foreignKey: 'applicantId' });

Job.hasMany(JobApplication, { foreignKey: 'jobId' });
JobApplication.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = {
  User,
  Skills,
  Job,
  JobApplication
};

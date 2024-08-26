const sequelize = require('../config/database');
const { Skills, User } = require('../models'); // Import from the centralized index file

exports.addSkillToUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    // Find the user and the skill
    const user = await User.findByPk(userId);
    const skill = await Skills.findByPk(id);

    if (!user || !skill) {
      return res.status(404).json({ message: "User or Skill  not found" });
    }

    await user.addSkill(skill);

    res.status(201).json({ message: "Skills added to user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding skill to user" });
    console.error("Error adding skill to user", error);
  }
};

exports.getUserSkills = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user and get their associated skills
    const user = await User.findByPk(userId, {
      include: Skills, // Sequelize association to include skills
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ skills: user.Skills });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user skills" });
    console.error("Error retrieving user skills", error);
  }
};

exports.addSkill = async (req, res,) => {
    try {
      const { name } = req.body;

      //ensure skill does not already exist
      const existingSkill = await Skills.findOne({ where: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')),  name.toLowerCase()) });
      if (existingSkill) {
        return res.status(400).json({ message: "Skill already exists" });
      }

      if (!name) {
        return res.status(400).json({ message: "Skill name is required" });
      }

      // Create a new skill
      await Skills.create({ name });

      res.status(201).json({ message: "Skill created successfully", status: true });
    } catch (error) {
      res.status(500).json({ message: "Error creating skill", status: false });
      console.error("Error creating skill", error);
    }
  };

//   Soft-delete a skill
  exports.deleteSkill = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the skill and update its deleted status
      const skill = await Skills.findByPk(id);
      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }
  
      skill.deleted = true;
      await skill.save();
  
      res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting skill" });
      console.error("Error deleting skill", error);
    }
  };

exports.getAllSkills = async (req, res) => {
    try {

      // Fetch all skills, excluding soft-deleted ones
      
      const skills = await Skills.findAll({ where: { deleted: false } });

      res.status(200).json({ skills });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving skills" });
      console.error("Error retrieving skills", error);
    }
  
}
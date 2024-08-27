const express = require('express');
const authorize = require('../middleware/authorize');
const skillController = require('../controllers/skillsController');

const router = express.Router();

router.post("/skills", authorize(['admin']), skillController.addSkill);

router.post("/user/skills", authorize(['job_seeker', 'employer', 'admin']), skillController.addSkillToUser);

router.get("/user/skills", authorize(['job_seeker', 'employer', 'admin']), skillController.getUserSkills);

router.get("/skills", authorize(['job_seeker', 'employer', 'admin']), skillController.getAllSkills);

router.delete("/skills/:id", authorize(['admin']), skillController.deleteSkill);




module.exports = router;

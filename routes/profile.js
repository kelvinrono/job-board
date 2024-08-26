const express = require('express');

const router = express.Router();

const profileController =  require('../controllers/profileController');
const skillController = require('../controllers/skillsController')

const authorize = require('../middleware/authorize');

router.get("/user", authorize(['job_seeker', 'employer', 'admin']), profileController.getProfile)

router.put("/user", authorize(['job_seeker', 'employer', 'admin']), profileController.updateProfile)

router.delete("/user/:id", authorize(['admin']), profileController.deleteProfile)

router.get("/user/skills", authorize(['job_seeker', 'employer', 'admin']), skillController.getUserSkills)

router.post("/user/skills", authorize(['job_seeker', 'employer', 'admin']), skillController.addSkillToUser)

module.exports = router
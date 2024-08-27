const express = require('express');

const router = express.Router();

const profileController =  require('../controllers/profileController');
const skillController = require('../controllers/skillsController')

const authorize = require('../middleware/authorize');

router.get("/user", authorize(['job_seeker', 'employer', 'admin']), profileController.getProfile)

router.put("/user", authorize(['job_seeker', 'employer', 'admin']), profileController.updateProfile)

router.delete("/user/:id", authorize(['admin']), profileController.deleteProfile)


module.exports = router
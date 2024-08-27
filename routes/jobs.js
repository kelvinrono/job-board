// routes/jobs.js

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authorize = require('../middleware/authorize');

router.post('/jobs', authorize(['employer']), jobController.createJob);

router.get('/jobs', jobController.getAllJobs);

router.put('/jobs/:id', authorize(['employer', 'admin']), jobController.updateJob);

module.exports = router;

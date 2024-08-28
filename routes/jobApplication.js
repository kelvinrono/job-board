const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const authorize = require('../middleware/authorize');

router.post('/applications', authorize(['job_seeker']), jobApplicationController.submitApplication);

router.get('/jobs/:jobId/applications', authorize(['admin', 'employer']), jobApplicationController.getApplicationsForJob);

router.get('/users/:userId/applications', authorize(['admin', 'job_seeker']), jobApplicationController.getApplicationsByUser);

router.put('/applications/:applicationId', authorize(['admin', 'employer']), jobApplicationController.updateApplication);

router.delete('/applications/:applicationId', authorize(['admin', 'employer']), jobApplicationController.deleteApplication);


module.exports = router;

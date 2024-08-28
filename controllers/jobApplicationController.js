const {JobApplication, User, Job} = require('../models')

exports.submitApplication = async (req, res) => {
    try {
      const { jobId, coverLetter, resume } = req.body;
      const applicantId = req.user.id; 

      const existingApplication = await JobApplication.findOne({
        where: {
          jobId,
          applicantId,
        },
      });

      if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }
      // Create a new job application
       await JobApplication.create({
        jobId,
        applicantId,
        coverLetter,
        resume,
        status: 'pending',
      });
  
      res.status(201).json({ message: 'Application submitted successfully', status:true });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting application' });
      console.error('Error submitting application', error);
    }
  };
  
  exports.getApplicationsForJob = async (req, res) => {
    try {
      const jobId = req.params.jobId;
  
      // Fetch all applications for the specified job
      const applications = await JobApplication.findAll({
        where: { jobId },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Job,
            attributes: ['id', 'title', 'status'],
          },
        ]
      });
  
      res.status(200).json({ applications });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving applications' });
      console.error('Error retrieving applications', error);
    }
  };
  
  exports.updateApplication = async (req, res) => {
    try {
      const applicationId = req.params.applicationId;
      const { status } = req.body;
  
      // Find the application and update its status
      const application = await JobApplication.findByPk(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      application.status = status;
      await application.save();
  
      res.status(200).json({ message: 'Application updated successfully', application });
    } catch (error) {
      res.status(500).json({ message: 'Error updating application' });
      console.error('Error updating application', error);
    }
  };
  
  exports.deleteApplication = async (req, res) => {
    try {
      const applicationId = req.params.applicationId;
  
      const application = await JobApplication.findByPk(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      await application.destroy();
  
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting application' });
      console.error('Error deleting application', error);
    }
  };
  
exports.getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== parseInt(userId) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const applications = await JobApplication.findAll({
      where: { applicantId: userId },
      include: [{ model: Job, attributes: ['id', 'title', 'description'] }],
    });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user' });
    }

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user applications' });
    console.error('Error retrieving user applications', error);
  }
};

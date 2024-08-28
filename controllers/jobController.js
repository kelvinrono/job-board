
const { Job } = require('../models'); // Import Job and User models

exports.createJob = async (req, res) => {
  try {
    const employerId = req.user.id;
    const { title, description, location, salary } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: 'Title, description, and location are required' });
    }

  await Job.create({
      title,
      description,
      location,
      salary,
      employerId,
    });

    res.status(201).json({ message: 'Job created successfully', status: true });
  } catch (error) {
    console.error('Error creating job', error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

// Get all jobs (for listing jobs)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { status: 'open' }
    });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id; 
    const { title, description, status, location, salary } = req.body;

    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }


    if (job.employerId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to update this job" });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.status = status || job.status;
    job.location = location || job.location;
    job.salary = salary || job.salary;

    await job.save();

    res.status(200).json({ message: "Job updated successfully", status:true });
  } catch (error) {
    res.status(500).json({ message: "Error updating job" });
    console.error("Error updating job", error);
  }
};

const Application = require("../models/Application.model");
const Job = require("../models/Job.model");

/*
  1️⃣ Apply for a job (Seeker)
*/
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      seekerId: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      jobId,
      seekerId: req.user.id,
      status: "applied"
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  2️⃣ Get applications of logged-in seeker
*/
exports.getSeekerApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      seekerId: req.user.id
    }).populate("jobId");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  3️⃣ Get applicants for employer’s job
*/
exports.getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate("seekerId", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  4️⃣ Update application status (Employer)
*/
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status; // accepted / rejected
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
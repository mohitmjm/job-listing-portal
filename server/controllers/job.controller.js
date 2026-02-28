const Job = require("../models/Job.model");

/*
  1️⃣ Create Job (Employer)
*/
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      employerId: req.user.id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  2️⃣ Get All Jobs (Public)
*/
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  3️⃣ Get Single Job
*/
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  4️⃣ Get Jobs Created By Employer
*/
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      employerId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  5️⃣ Delete Job (Employer Only)
*/
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure employer owns the job
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  6️⃣ Update Job (Optional)
*/
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
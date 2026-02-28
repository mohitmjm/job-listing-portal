const express = require("express");
const router = express.Router();

const {
  applyJob,
  getSeekerApplications,
  getJobApplicants,
  updateApplicationStatus
} = require("../controllers/application.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Apply job
router.post("/", authMiddleware, applyJob);

// Get logged-in seeker applications
router.get("/seeker", authMiddleware, getSeekerApplications);

// Get applicants for job (employer)
router.get("/job/:jobId", authMiddleware, getJobApplicants);

// Update status (employer)
router.put("/:id", authMiddleware, updateApplicationStatus);

module.exports = router;
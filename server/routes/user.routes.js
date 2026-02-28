const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  getEmployerJobs,
  deleteJob,
  updateJob
} = require("../controllers/job.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

/*
  ===============================
  🌍 Public Routes
  ===============================
*/

// Get all jobs
// GET /api/jobs
router.get("/", getAllJobs);

// Get single job by ID
// GET /api/jobs/:id
router.get("/:id", getJobById);


/*
  ===============================
  🏢 Employer Routes (Protected)
  ===============================
*/

// Create job
// POST /api/jobs
router.post(
  "/",
  authMiddleware,
  roleMiddleware("employer"),
  createJob
);

// Get employer's own jobs
// GET /api/jobs/employer
router.get(
  "/employer",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerJobs
);

// Update job
// PUT /api/jobs/:id
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("employer"),
  updateJob
);

// Delete job
// DELETE /api/jobs/:id
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("employer"),
  deleteJob
);

module.exports = router;
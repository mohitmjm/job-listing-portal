const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["applied", "accepted", "rejected"],
      default: "applied"
    },

    resumeSnapshot: {
      type: String   // optional: store resume path at time of applying
    }
  },
  { timestamps: true }
);

/*
  Prevent duplicate applications
  (One seeker cannot apply twice to same job)
*/
applicationSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
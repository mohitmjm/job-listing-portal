const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    salary: {
      type: String
    },

    description: {
      type: String,
      required: true
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Internship"],
      default: "Full-time"
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

/*
  Add text index for search functionality
*/
jobSchema.index({
  title: "text",
  company: "text",
  location: "text"
});

module.exports = mongoose.model("Job", jobSchema);
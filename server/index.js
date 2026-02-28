const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

/*
  ===============================
  Middleware
  ===============================
*/

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

/*
  ===============================
  Routes
  ===============================
*/

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

/*
  ===============================
  Health Check Route
  ===============================
*/
app.get("/", (req, res) => {
  res.send("🚀 Job Listing Portal API Running...");
});

/*
  ===============================
  Global Error Handler (Optional but Good Practice)
  ===============================
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

/*
  ===============================
  Start Server
  ===============================
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
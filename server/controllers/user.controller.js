const User = require("../models/User.model");

/*
  1️⃣ Get Logged-in User Profile
*/
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  2️⃣ Update Profile (Name Only for Now)
*/
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      resume: user.resume
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  3️⃣ Upload Resume (Seeker Only)
*/
exports.uploadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save resume file path
    user.resume = req.file.path;

    await user.save();

    res.json({ message: "Resume uploaded successfully", resume: user.resume });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
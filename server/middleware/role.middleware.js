const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Ensure user exists (authMiddleware must run before this)
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
      }

      // Check role
      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          message: `Access denied. ${requiredRole} role required.`
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = roleMiddleware;
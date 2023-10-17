const Admin = require("../models/admin");

module.exports = {
  verifyAdmin: async (req, res, next) => {
    const { type, userSessionID } = req.cookies;
    const admin = await Admin.findById(userSessionID);

    if (admin && type === "ADMIN") {
      next();
    } else {
      res.status(403).json({
        message: "You have not permission",
      });
    }
  },
};

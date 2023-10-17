const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    role: {
        type: String,
        default: 'admin'
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;

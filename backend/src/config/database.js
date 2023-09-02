const mongoose = require("mongoose");

// mongoose.set("strictQuery", false);

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connection;

require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const cors = require("cors");
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFile: true }));
const connection = require("./src/config/database");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

const apiRoute = require("./src/routes/api");
const authRoute = require("./src/routes/auth");
// const uploadRoute = require('./routes/fileUpload');
const path = require("path");

app.get("/", (req, res) => {
  res.send("Welcome to tuanna-blog");
});

// app.use(cookies());
// app.use(express.static(path.join('./src', 'public')));
app.use("/v1/api", apiRoute);
app.use("/auth", authRoute);
// app.use('/upload', uploadRoute);

(async () => {
  try {
    await connection();
    server.listen(port, hostname, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(`🚀 ~ error:`, error);
  }
})();

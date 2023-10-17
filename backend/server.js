require("dotenv").config();
const cookieParser = require('cookie-parser');
const express = require("express");
const http = require("http");
const app = express();
app.use(cookieParser());

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
const path = require("path");

app.get("/", (req, res) => {
  res.send("Author: tuanna");
});

app.use(express.static(path.join('./src', 'public')));
app.use("/v1/api", apiRoute);
app.use("/auth", authRoute);

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

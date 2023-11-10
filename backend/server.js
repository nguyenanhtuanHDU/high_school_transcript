require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const app = express();
app.use(cookieParser());

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
const {
  getListBlocksTemp,
  createBlockTemp,
  updateBlockTempToBlock,
  deleteBlockTempByID,
} = require("./src/services/block.services");
const {
  verifyDeleteBlockTemp,
  verifyRoleSign,
} = require("./src/middleware/block");

app.get("/", (req, res) => {
  res.send("Author: tuanna");
});

app.use(express.static(path.join("./src", "public")));
app.use("/v1/api", apiRoute);
app.use("/auth", authRoute);

const server = http.createServer(app);

(async () => {
  try {
    await connection();
    server.listen(port, hostname, () => {
      console.log(`Server listening on port ${port}`);
    });

    const io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (client) => {
      console.log("client connected");
      client.on("data", (data) => {});
      client.on("disconnect", () => {
        console.log("socket disconnect");
      });
    });

    app.post("/v1/api/block/temp", verifyRoleSign, async (req, res) => {
      try {
        const { teacherID } = req.query;
        const data = {};
        data.data = req.body;
        const payload = await createBlockTemp(data, teacherID);
        io.emit("data", "BLOCK_TEMP_CREATED");

        if (payload === "OK") {
          res.status(200).json({
            message: payload,
          });
        } else {
          res.status(400).json({
            EC: 1,
            message: payload,
          });
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
        res.status(400).json({
          EC: 1,
          message: "Server error",
        });
      }
    });

    app.put("/v1/api/block/:blockID", async (req, res) => {
      try {
        const { blockID } = req.params;
        const { principalID } = req.query;
        const payload = await updateBlockTempToBlock(blockID, principalID);
        io.emit("data", "BLOCK_CREATED");
        if (payload === "OK") {
          res.status(200).json({
            message: payload,
          });
        } else {
          res.status(400).json({
            EC: 1,
            message: payload,
          });
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
        res.status(400).json({
          EC: 1,
          message: "Server error",
        });
      }
    });

    app.delete(
      "/v1/api/block/temp/:blockID",
      verifyDeleteBlockTemp,
      async (req, res) => {
        try {
          const { blockID } = req.params;
          const payload = await deleteBlockTempByID(blockID);
          io.emit("data", "BLOCK_TEMP_DELETED");
          if (payload === "OK") {
            res.status(200).json({
              message: payload,
            });
          } else {
            res.status(400).json({
              EC: 1,
              message: payload,
            });
          }
        } catch (error) {
          console.log("🚀 ~ error:", error);
          res.status(400).json({
            EC: 1,
            message: "Server error",
          });
        }
      }
    );
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
})();

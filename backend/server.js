const connectDB = require("./service/db.js");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const router = express.Router();
const app = express();

//connect to the database
connectDB();

//Loading endpoints
const gateways = require("./routes/api/gateways");
const devices = require("./routes/api/devices");
const errorHandler = require("./middleware/error_hanlder/errorHandler.js");

//Logging Requests to Server
app.use(morgan("dev"));

//Cross Origin Resource Sharing Controls
app.use(cors());

// Access Controls
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

//Use Error Handler
app.use(errorHandler);

//Use Routes
app.use("/", router);
app.use("/api/gateways", gateways);
app.use("/api/devices", devices);

/** GET /api-status - Check service status **/
router.get("/", (req, res) =>
  res.json({
    status: "ok",
    Message: "Server running successfuly!",
  })
);

router.get("/api", (req, res) =>
  res.json({
    status: "ok",
    Message: "Welcome to Gateway Manager API!",
  })
);

app.all("*", (req, res) => {
  console.log("Error: Route not found.");
  return res.sendStatus(404);
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server started on port ${port}`));

const connectDB = require("./service/db.js");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const router = express.Router();
const app = express();

//connect to the database
connectDB();

//Cross Origin Resource Sharing Controls
app.use(cors({ origin: "https://gateway-manager.vercel.app" }));

//Loading endpoints
const gateways = require("./routes/api/gateways");
const devices = require("./routes/api/devices");

//Logging Requests to Server
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

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

const port = process.env.NODE_ENV === "test" ? 4000 : 7000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;

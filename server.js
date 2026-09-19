const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./db");
const eventRoutes = require("./eventRoutes");
const errorHandler = require("./errorHandler");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Event Management API is running",
  });
});

app.use("/api/events", eventRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

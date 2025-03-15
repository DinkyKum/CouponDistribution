const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const couponRouter = require("./routes/coupon");
const claimRouter= require('./routes/claim');

const app = express();
const port = process.env.PORT || 3001;
const isVercel = !!process.env.VERCEL; // Detect if running on Vercel
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5174", "https://coupon-distribution-tau.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);

app.use(express.json());

app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 0) {
    try {
      await connectDB();
    } catch (err) {
      console.error("Database Connection Failed:", err);
      return res.status(500).json({ error: "Database Connection Failed" });
    }
  }
  next();
});

app.get("/", (req, res) => {
  res.send("All is Well!");
});

app.use("/", couponRouter);
app.use("/", claimRouter);

if (isVercel) {
  module.exports = async (req, res) => {
    try {
      if (mongoose.connection.readyState === 0) await connectDB();
      return app(req, res);
    } catch (err) {
      console.error("Vercel API Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
} else {

  connectDB()
    .then(() => {
      console.log("MongoDB Connected Successfully");
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Cannot connect to DB:", err);
      process.exit(1);
    });
}

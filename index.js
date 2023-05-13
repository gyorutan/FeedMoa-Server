const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { readdirSync } = require("fs");

// Dotenv
dotenv.config();

// Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
readdirSync("./routes").map((parameter) => app.use("/", require("./routes/" + parameter)));

// Checking Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on Server at PORT : ${process.env.PORT}`);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected on MongoDB"))
    .catch((err) => console.log(err));
});


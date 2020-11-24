/** Movies API Backend */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const moviesRoutes = require("./routes/movies");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(moviesRoutes);

/** 404 Not Found Error Handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/** Generic Error Handler */

app.use(function (err, req, res, next) {
  if (err.stack) console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;

const questionsRouter = require("./controllers/questions");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
require("dotenv").config();

/**
 * This option allows fields that are defined in the schema to be used in queries.
 * Mongoose will allow the use of fields in queries that are not defined in the schema.
 * This means you can query with arbitrary fields,
 * which can be useful in certain scenarios but may lead to unexpected behavior if not handled carefully.
 */
mongoose.set("strictQuery", false);

const mongoUri = config.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.morganMiddleware);

app.use("/api/questions", questionsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

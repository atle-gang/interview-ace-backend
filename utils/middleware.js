const morgan = require("morgan");

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

morgan.token("body", (req) => {
  return JSON.stringify(req.body)
})

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

module.exports = {
  morganMiddleware,
  unknownEndpoint,
  errorHandler,
};

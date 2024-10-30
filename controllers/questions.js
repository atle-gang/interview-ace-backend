const questionsRouter = require("express").Router();
const Question = require("../models/questionModel");

questionsRouter.get("/", async (request, response) => {
  const questions = await Question.find({});
  response.json(questions);
});

questionsRouter.post("/", async (request, response, next) => {
  try {
    const question = new Question({
      type: body.type,
      question: body.question,
    });

    const savedQuestion = await question.save();

    response.status(201).json(savedQuestion);
  } catch (error) {
    response.status(400);
    next(error);
  }
});

module.exports = questionsRouter;

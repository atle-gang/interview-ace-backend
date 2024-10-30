const questionsRouter = require("express").Router();
const Question = require("../models/questionModel");

questionsRouter.get("/", async (request, response, next) => {
  try {
    const questions = await Question.find({});
    response.json(questions);
  } catch (error) {
    next(error);
  }
});

questionsRouter.post("/", async (request, response, next) => {
  const body = request.body;

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

questionsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Question.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = questionsRouter;

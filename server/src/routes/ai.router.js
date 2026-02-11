const AiController = require("../controllers/Ai.controller");

const aiRouter = require("express").Router();

aiRouter.post("/generate", AiController.getAiResponse);

module.exports = aiRouter;

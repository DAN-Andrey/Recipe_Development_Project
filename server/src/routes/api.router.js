const apiRouter = require("express").Router();
const taskRouter = require("./task.router");
const authRouter = require("./auth.router");
const aiRouter = require("./ai.router");
const formatResponse = require("../utils/formatResponse");
const recipeRouter = require("./recipe.router");

apiRouter.use("/auth", authRouter);
apiRouter.use("/ai", aiRouter);
apiRouter.use("/recipe", recipeRouter);

// Обрабатываем несуществующие пути в API
apiRouter.use((req, res) => {
  return res.status(404).json(formatResponse(404, "Ресурс не найден"));
});

module.exports = apiRouter;

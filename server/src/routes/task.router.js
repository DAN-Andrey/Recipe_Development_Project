const taskRouter = require('express').Router();
const TaskController = require('../controllers/Task.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

taskRouter
  .get('/', TaskController.getTasks)
  .get('/:id', TaskController.getOneTask)
  .post('/', verifyAccessToken, TaskController.createTask)
  .put('/:id', TaskController.updateTask)
  .delete('/:id', verifyAccessToken, TaskController.deleteTask);

module.exports = taskRouter;

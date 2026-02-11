const viewRouter = require('express').Router();
const TaskController = require('../controllers/Task.controller');

viewRouter.get('/', TaskController.viewTasksPage);

module.exports = viewRouter;

const express = require('express');
const taskService = require('./tasks/taskService');
const asyncHandler = require('./utils/asyncHandler');

const app = express();

app.use(express.json());

app.post('/tasks', asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(201).json(task);
}));

app.get('/tasks', asyncHandler(async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}));

app.put('/tasks/:id', asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json(task);
}));

app.delete('/tasks/:id', asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.status(204).send();
}));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

src/tasks/taskService.js
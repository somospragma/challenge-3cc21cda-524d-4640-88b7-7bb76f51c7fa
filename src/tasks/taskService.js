const { TaskError } = require('../errors/taskError');

const tasks = [];

const createTask = async (data) => {
  if (!data.title) {
    throw new TaskError('Title is required');
  }
  const task = { id: tasks.length + 1,...data };
  tasks.push(task);
  return task;
};

const getAllTasks = async () => {
  return tasks;
};

const updateTask = async (id, data) => {
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) {
    throw new TaskError('Task not found');
  }
  Object.assign(task, data);
  return task;
};

const deleteTask = async (id) => {
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) {
    throw new TaskError('Task not found');
  }
  tasks.splice(index, 1);
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};

src/errors/taskError.js
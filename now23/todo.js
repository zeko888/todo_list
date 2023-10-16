const fs = require('fs');

class Todo {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    try {
      const tasksData = fs.readFileSync('todo.json', 'utf8');
      return JSON.parse(tasksData);
    } catch (error) {
      // If file doesn't exist or is empty, return an empty array
      return [];
    }
  }

  saveTasks() {
    const tasksData = JSON.stringify(this.tasks, null, 2);
    fs.writeFileSync('todo.json', tasksData);
  }

  addTask(task) {
    if (!task) {
      throw new Error('Task cannot be empty.');
    }

    this.tasks.push(task);

    this.saveTasks();
  }

  updateTask(taskIndex, updatedTask) {
    if (taskIndex < 0 || taskIndex >= this.tasks.length) {
      throw new Error('Invalid task index.');
    }

    this.tasks[taskIndex] = updatedTask;

    this.saveTasks();
  }

  deleteTask(taskIndex) {
    if (taskIndex < 0 || taskIndex >= this.tasks.length) {
      throw new Error('Invalid task index.');
    }

    this.tasks.splice(taskIndex, 1);

    this.saveTasks();
  }

  listTasks() {
    return this.tasks;
  }
}

module.exports = Todo;

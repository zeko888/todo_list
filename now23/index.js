const readline = require('readline');
const Todo = require('./todo');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const todo = new Todo();

function displayMenu() {
  console.log('Todo List Application');
  console.log('1. Add a task');
  console.log('2. Update a task');
  console.log('3. Delete a task');
  console.log('4. List all tasks');
  console.log('5. Exit');
}

function promptUser() {
  rl.question('Enter your choice: ', (choice) => {
    handleChoice(choice);
  });
}

function handleChoice(choice) {
  switch (choice) {
    case '1':
      addTask();
      break;
    case '2':
      updateTask();
      break;
    case '3':
      deleteTask();
      break;
    case '4':
      listTasks();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      promptUser();
  }
}

function addTask() {
  rl.question('Enter the task: ', (task) => {
    try {
      todo.addTask(task);
      console.log('Task added successfully.');
    } catch (error) {
      console.log('Error:', error.message);
    }
    promptUser();
  });
}

function updateTask() {
  rl.question('Enter the task index to update: ', (taskIndex) => {
    rl.question('Enter the updated task: ', (task) => {
      try {
        todo.updateTask(taskIndex, task);
        console.log('Task updated successfully.');
      } catch (error) {
        console.log('Error:', error.message);
      }
      promptUser();
    });
  });
}

function deleteTask() {
  rl.question('Enter the task index to delete: ', (taskIndex) => {
    try {
      todo.deleteTask(taskIndex);
      console.log('Task deleted successfully.');
    } catch (error) {
      console.log('Error:', error.message);
    }
    promptUser();
  });
}

function listTasks() {
  const tasks = todo.listTasks();
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log('Tasks:');
    tasks.forEach((task, index) => {
      console.log(`- ${index}: ${task}`);
    });
  }
  promptUser();
}

displayMenu();
promptUser();

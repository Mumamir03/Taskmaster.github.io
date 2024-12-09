// Simulating a "database" with localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Create a New Task
function createTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const deadline = document.getElementById("taskDeadline").value;
  const priority = document.getElementById("taskPriority").value;

  if (!title || !description) {
    alert("Title and description are required!");
    return;
  }

  const newTask = {
    id: Date.now(), // Unique ID based on timestamp
    title,
    description,
    deadline,
    priority,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTask(newTask);

  // Clear input fields
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDeadline").value = "";
  document.getElementById("taskPriority").value = "low";
}

// Load tasks from "database"
function loadTasks() {
  tasks.forEach(displayTask);
}

// Display a single task
function displayTask(task) {
  const taskList = document.getElementById("taskList");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.innerHTML = `
    <div class="task-title">${task.title}</div>
    <div class="task-priority">${task.priority}</div>
    <div class="task-deadline">${task.deadline ? new Date(task.deadline).toDateString() : "No deadline"}</div>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;

  taskList.appendChild(taskDiv);
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Refresh task list
  document.getElementById("taskList").innerHTML = "";
  loadTasks();
}

// Search for tasks
function searchTasks() {
  const searchText = document.getElementById("searchBar").value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText) ||
    task.description.toLowerCase().includes(searchText)
  );

  document.getElementById("taskList").innerHTML = "";
  filteredTasks.forEach(displayTask);
}

// Filter tasks by priority
function filterTasks() {
  const selectedPriority = document.getElementById("filterPriority").value;
  const filteredTasks = selectedPriority
    ? tasks.filter((task) => task.priority === selectedPriority)
    : tasks;

  document.getElementById("taskList").innerHTML = "";
  filteredTasks.forEach(displayTask);
}


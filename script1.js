document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');

    // Check if there are tasks in local storage and load them
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskToUI(task);
    });

    document.getElementById('task-form').addEventListener('submit', function (event) {
        event.preventDefault();
        addTask();
    });

    taskList.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('delete-btn')) {
            const taskId = target.parentElement.dataset.id;
            deleteTask(taskId);
        } else if (target.classList.contains('edit-btn')) {
            const taskId = target.parentElement.dataset.id;
            editTask(taskId);
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = { id: new Date().getTime(), text: taskText };

    addTaskToUI(task);
    addTaskToLocalStorage(task);

    taskInput.value = '';
}

function addTaskToUI(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    li.dataset.id = task.id;
    taskList.appendChild(li);
}

function deleteTask(taskId) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.querySelector(`li[data-id="${taskId}"]`);

    taskList.removeChild(taskItem);
    deleteTaskFromLocalStorage(taskId);
}

function editTask(taskId) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
    const taskText = taskItem.querySelector('span').innerText;

    const newText = prompt('Edit Task:', taskText);

    if (newText !== null) {
        taskItem.querySelector('span').innerText = newText;
        updateTaskInLocalStorage(taskId, newText);
    }
}

function addTaskToLocalStorage(task) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function deleteTaskFromLocalStorage(taskId) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks = savedTasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function updateTaskInLocalStorage(taskId, newText) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = savedTasks.findIndex(task => task.id == taskId);

    if (taskIndex !== -1) {
        savedTasks[taskIndex].text = newText;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
}

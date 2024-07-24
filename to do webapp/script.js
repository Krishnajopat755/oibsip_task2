let tasks = [];
let pendingTasks = document.getElementById('pending-tasks');
let completedTasks = document.getElementById('completed-tasks');

document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let titleInput = document.getElementById('title');
    let descriptionInput = document.getElementById('description');
    let task = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };
    if (task.title && task.description) {
        addTask(task);
        titleInput.value = '';
        descriptionInput.value = '';
    }
});

function addTask(task) {
    tasks.push(task);
    renderTasks();
}

function renderTasks() {
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    tasks.forEach((task) => {
        let taskHTML = `
            <li class="task" data-id="${task.createdAt}">
                <span>${task.title}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">${task.completed? 'Undo' : 'Complete'}</button>
            </li>
        `;
        if (task.completed) {
            completedTasks.innerHTML += taskHTML;
        } else {
            pendingTasks.innerHTML += taskHTML;
        }
    });
    addEventListeners();
}

function addEventListeners() {
    let taskListItems = document.querySelectorAll('.task');
    taskListItems.forEach((taskListItem) => {
        let task = tasks.find((t) => t.createdAt === taskListItem.dataset.id);
        taskListItem.querySelector('.edit-btn').addEventListener('click', () => {
            editTask(task);
        });
        taskListItem.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(task);
        });
        taskListItem.querySelector('.complete-btn').addEventListener('click', () => {
            completeTask(task);
        });
    });
}

function editTask(task) {
    let titleInput = document.getElementById('title');
    let descriptionInput = document.getElementById('description');
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    titleInput.focus();
    titleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            task.title = titleInput.value.trim();
            task.description = descriptionInput.value.trim();
            renderTasks();
        }
    });
}

function deleteTask(task) {
    tasks = tasks.filter((t) => t.createdAt !== task.createdAt);
    renderTasks();
}

function completeTask(task) {
    task.completed = !task.completed;
    task.completedAt = task.completed? new Date().toLocaleString() : null;
    renderTasks();
}

renderTasks();
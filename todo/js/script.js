const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const calendar = document.getElementById('calendar');

let tasks = [];

// Add a new task to the list
function addTask(task) {
    tasks.push(task);
    renderTasks();
}

// Remove a task from the list
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Mark a task as completed
function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
}

// Render the list of tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => completeTask(index));
        taskList.appendChild(li);
    });
}

// Render the calendar
function renderCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Create a table for the calendar
    const table = document.createElement('table');

    // Create the header row
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(dayOfWeek => {
        const th = document.createElement('th');
        th.textContent = dayOfWeek;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Calculate the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Calculate the index of the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonthIndex = new Date(year, month, 1).getDay();

    // Calculate the number of weeks in the month
    const numRows = Math.ceil((firstDayOfMonthIndex + daysInMonth) / 7);

    // Create the cells for the calendar
    let dayOfMonth = 1;
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonthIndex) {
                // This cell is before the first day of the month
                cell.textContent = '';
            } else if (dayOfMonth > daysInMonth) {
                // This cell is after the last day of the month
                cell.textContent = '';
            } else {
                // This cell is a day of the month
                cell.textContent = dayOfMonth;
                if (year === today.getFullYear() && month === today.getMonth() && dayOfMonth === today.getDate()) {
                    cell.classList.add('today');
                }
                cell.addEventListener('click', () => {
                    const newTask = {
                        text: `Task for ${month + 1}/${dayOfMonth}/${year}`,
                        completed: false
                    };
                    addTask(newTask);
                });
                dayOfMonth++;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    // Add the table to the calendar div
    calendar.appendChild(table);
}

// Handle the form submission
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            text: taskText,
            completed: false
        };
        addTask(newTask);
        taskInput.value = '';
    }
});

// Render the initial calendar and task list
renderCalendar();
renderTasks(); 
class TodoList {
    constructor() {
        this.taskInput = document.getElementById("taskInput");
        this.addBtn = document.getElementById("addBtn");
        this.clearBtn = document.getElementById("clearBtn");
        this.taskList = document.getElementById("taskList");

        this.loadTasks();

        this.addBtn.addEventListener("click", () => this.addTask());
        this.clearBtn.addEventListener("click", () => this.clearTasks());

        this.taskInput.addEventListener("keypress", e => {
            if (e.key === "Enter") this.addTask();
        });
    }

    addTask() {
        const taskText = this.taskInput.value;
        if (!taskText) return;

        this.tasks.push(taskText);
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = "";
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    clearTasks() {
        if (confirm("Вы уверены, что хотите очистить список?")) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem("tasks");
        this.tasks = saved ? JSON.parse(saved) : [];
        this.renderTasks();
    }

    renderTasks() {
        this.taskList.innerHTML = "Список дел";

        this.tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;

            const btn = document.createElement("button");
            btn.textContent = "Удалить";
            btn.onclick = () => this.removeTask(index);

            li.appendChild(btn);
            this.taskList.appendChild(li);
        });
    }
}

new TodoList();
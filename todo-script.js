// selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

// eventlistener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

// functions

function addTodo(event) {
    event.preventDefault();
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // buat entry list baru
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)
    // masukin local storage
    saveLocal(todoInput.value);
    // tombol chek
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // tombol delete
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"><i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // append ke list
    todoList.appendChild(todoDiv);
    // clear input
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        todo.classList.add("delete-animation")
        removeLocal(todo);
        todo.addEventListener("finish", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // buat entry list baru
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo)
        // tombol chek
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"><i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // tombol delete
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"><i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // append ke list
        todoList.appendChild(todoDiv);
    });
}

function removeLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
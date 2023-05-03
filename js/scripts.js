const todo_list = document.querySelector("#todo-list")
const create_btn = document.querySelector("#add-todo")

// stores elements of todo list
let todos = []

create_btn.addEventListener("click", createTodo);





function createTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false,
    }

    todos.unshift(item)
}
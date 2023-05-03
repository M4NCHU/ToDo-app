const todoList = document.querySelector("#todo-list")
const createBtn = document.querySelector("#add-todo")

// stores elements of todo list
let todos = []

createBtn.addEventListener("click", createTodo);



function createTodo() {
    // default item values
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false,
    }

    // create todo at the top of the list
    todos.unshift(item)

    const {itemEl, todoInput} = createItem(item)
    todoList.prepend(itemEl)

    todoInput.removeAttribute("disabled")
    todoInput.focus()

    saveTodo()
}

// Create todo element

function createItem(item) {
    const itemEl = document.createElement("li")
    itemEl.classList.add("todo-element")

    const todoLeft = document.createElement("div")
    todoLeft.classList.add("todo-left")

    const todoCheck = document.createElement("div")
    todoCheck.classList.add("todo-check")

    const todoCheckbox = document.createElement("input")
    todoCheckbox.classList.add("input-checkbox")
    todoCheckbox.type = "checkbox"
    todoCheckbox.checked = item.complete

    const todoText = document.createElement("div")
    todoText.classList.add("todo-text")

    const todoInput = document.createElement("textarea")
    todoInput.classList.add("input-todo")
    todoInput.type = "text"
    todoInput.value = item.text
    todoInput.setAttribute("disabled", "")

    if (item.complete) {
        itemEl.classList.add("complete")
    }

    const todoActions = document.createElement("div")
    todoActions.classList.add("todo-actions")

    const editBtn = document.createElement("button")
    editBtn.classList.add("material-icons", "action-item")
    editBtn.innerText = "edit"

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("material-icons", "action-item")
    deleteBtn.innerText = "delete"

    itemEl.append(todoLeft)
    itemEl.append(todoActions)

    todoLeft.append(todoCheck)
    todoLeft.append(todoText)


    todoCheck.append(todoCheckbox)
    todoText.append(todoInput)

    todoActions.append(editBtn)
    todoActions.append(deleteBtn)

    todoCheckbox.addEventListener("change", () => {
        item.complete = todoCheckbox.checked
        item.complete ? itemEl.classList.add("complete") : itemEl.classList.remove("complete")
        saveTodo()
    })

    todoInput.addEventListener("input", () => {
        item.text = todoInput.value
    })

    todoInput.addEventListener("blur", () => {
        todoInput.setAttribute("disabled", "")
        saveTodo()
    })

    editBtn.addEventListener("click", () => {
        todoInput.removeAttribute("disabled")
        todoInput.focus()
    })

    deleteBtn.addEventListener("click", () => {
        todos = todos.filter(t=>t.id != item.id)
        itemEl.remove()
        saveTodo()
    })

    return { itemEl, todoInput, editBtn, deleteBtn }

}

function displayTodos() {
    loadTodos()

    console.log(todos.length)
    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const {itemEl, todoInput} = createItem(item)
        todoList.append(itemEl)
        
    }
}

displayTodos()

function saveTodo() {
    const saveTD = JSON.stringify(todos) 
    localStorage.setItem("todos-list", saveTD)
}

function loadTodos() {
    const data = localStorage.getItem("todos-list")

    if (data) {
        todos = JSON.parse(data)
    }
}

const copyrightFooter = `
 <p>
  Copyright © ${new Date().getFullYear()} Maciej Szwast
 </p>
`;

document.getElementById('copyrightYear').innerHTML = copyrightFooter;
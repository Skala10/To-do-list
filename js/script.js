export class ToDoList {
  constructor() {
    this.text = document.querySelector(".add-item__input")
    this.addTaskButton = document.querySelector(".add-item__button")
    this.listBox = document.querySelector(".incompleted-task")
    this.listBoxCompleted = document.querySelector(".completed-task")
    this.todoArray = []
    this.updateTodoList()
  }

  addNewTask(e) {
    e.preventDefault()
    let todo = localStorage.getItem("todo")
    if (todo === null) {
      this.todoArray = []
    } else {
      this.todoArray = JSON.parse(todo)
    }
    if (this.text.value.trim() !== "") {
      this.todoArray.push({ text: this.text.value, completed: false })
      this.text.value = ""
      localStorage.setItem("todo", JSON.stringify(this.todoArray))
      this.updateTodoList()
    }
  }

  updateTodoList() {
    let todo = localStorage.getItem("todo")
    if (todo === null) {
      this.todoArray = []
    } else {
      this.todoArray = JSON.parse(todo)
    }
    let htmlCode = ""
    let htmlCodeCompleted = ""
    this.todoArray.forEach((list, ind) => {
      if (list.completed) {
        htmlCodeCompleted += `<li class="new-task">
         <div class="text-div">
         <input type="checkbox" checked>
         <label style="text-decoration: line-through;">${list.text}</label>
         <input type="text" value="${list.text}">
         </div>
         <div class="button-div">
         <button class="edit" data-index="${ind}">Edit</button>
         <button class="delete" data-index="${ind}">Delete</button>
         </div></li>`
      } else {
        htmlCode += `<li class="new-task">
         <div class="text-div">
         <input type="checkbox">
         <label>${list.text}</label>
         <input type="text" value="${list.text}">
         </div>
         <div class="button-div">
         <button class="edit" data-index="${ind}">Edit</button>
         <button class="delete" data-index="${ind}">Delete</button>
         </div></li>`
      }
    })
    this.listBox.innerHTML = htmlCode
    this.listBoxCompleted.innerHTML = htmlCodeCompleted

    const editButtons = document.querySelectorAll(".edit")
    const deleteButtons = document.querySelectorAll(".delete")
    const checkBoxes = document.querySelectorAll("input[type=checkbox]")
    editButtons.forEach((button) => {
      button.addEventListener("click", ({ target }) => {
        const index = target.dataset.index
        this.edit(index, target)
      })
    })

    deleteButtons.forEach((button) => {
      button.addEventListener("click", ({ target }) => {
        const index = target.dataset.index
        this.deleteTodo(index)
      })
    })

    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("change", (e) => {
        this.toggleChecked(e)
      })
    })
  }

  deleteTodo(index) {
    let todo = localStorage.getItem("todo")
    this.todoArray = JSON.parse(todo)
    this.todoArray.splice(index, 1)
    localStorage.setItem("todo", JSON.stringify(this.todoArray))
    this.updateTodoList()
  }

  edit(index, target) {
    let todo = localStorage.getItem("todo")
    this.todoArray = JSON.parse(todo)
    const listItem = target.closest(".new-task")
    const editInput = listItem.querySelector("input[type=text]")
    const label = listItem.querySelector("label")
    const containsClass = listItem.classList.contains("editMode")
    if (containsClass) {
      label.textContent = editInput.value
      this.todoArray[index].text = editInput.value
      localStorage.setItem("todo", JSON.stringify(this.todoArray))
    } else {
      editInput.value = label.textContent
    }
    listItem.classList.toggle("editMode")
  }

  toggleChecked(event) {
    let listItem = event.target.closest(".new-task")
    let editInput = listItem.querySelector("label")
    let checkInput = listItem.querySelector("input[type=checkbox]")
    let index = Array.from(listItem.parentNode.children).indexOf(listItem)

    if (checkInput.checked) {
      editInput.style.textDecoration = "line-through"
      this.listBoxCompleted.append(listItem)
      this.todoArray[index].completed = true
      localStorage.setItem("todo", JSON.stringify(this.todoArray))
    } else {
      this.listBox.append(listItem)
      editInput.style.textDecoration = "none"
      this.todoArray[index].completed = false
      localStorage.setItem("todo", JSON.stringify(this.todoArray))
    }
  }

  render() {
    this.addTaskButton.addEventListener("click", (e) => {
      this.addNewTask(e)
    })
  }
}

const todoList = new ToDoList()
todoList.render()

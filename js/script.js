class ElementCreator {
  static createHTMLElement({ tag, props, attrs, styles, events }) {
    const el = document.createElement(tag)
    if (props) {
      for (const propKey in props) {
        el[propKey] = props[propKey]
      }
    }
    if (attrs) {
      for (const attrKey in attrs) {
        el.setAttribute(attrKey, attrs[attrKey])
      }
    }
    if (styles) {
      for (const cssProp in styles) {
        el.style[cssProp] = styles[cssProp]
      }
    }
    if (events) {
      for (const event in events) {
        el.addEventListener(event, events[event])
      }
    }
    return el
  }
}

class ToDoList {
  constructor() {}

  getTextFromMainInput() {
    let newTask = document.querySelector(".add-item__input").value
    return newTask
  }

  clearInput() {
    document.querySelector(".add-item__input").value = ""
  }

  toggleEdit(event) {
    let listItem = event.target.closest(".new-task")
    let editInput = listItem.querySelector("input[type=text]")
    let label = listItem.querySelector("label")
    let containsClass = listItem.classList.contains("editMode")
    label.innerText = containsClass ? editInput.value : label.innerText
    editInput.value = containsClass ? editInput.value : label.innerText
    listItem.classList.toggle("editMode")
  }

  toggleChecked(event) {
    let listItem = event.target.closest(".new-task")
    let editInput = listItem.querySelector("label")
    let checkInput = listItem.querySelector("input[type=checkbox]")
    let completedTask = document.querySelector(".completed-task")
    let incompletedTask = document.querySelector(".incompleted-task")

    if (checkInput.checked) {
      editInput.style.textDecoration = "line-through"
      completedTask.append(listItem)
    } else {
      incompletedTask.append(listItem)
      editInput.style.textDecoration = "none"
    }
  }

  deleteTask(event) {
    let listItem = event.target.closest(".new-task")
    listItem.remove()
  }

  createElement(newTask) {
    let li = ElementCreator.createHTMLElement({
      tag: "li",
      attrs: { class: "new-task" },
    })

    let textDiv = ElementCreator.createHTMLElement({
      tag: "div",
      attrs: { class: "text-div" },
    })

    let inputCheckbox = ElementCreator.createHTMLElement({
      tag: "input",
      attrs: { type: "checkbox" },
      events: { change: this.toggleChecked.bind(this) },
    })

    let label = ElementCreator.createHTMLElement({
      tag: "label",
      props: { textContent: newTask },
    })

    let inputText = ElementCreator.createHTMLElement({
      tag: "input",
      attrs: { type: "text", value: newTask },
    })

    let buttonDiv = ElementCreator.createHTMLElement({
      tag: "div",
      attrs: { class: "button-div" },
    })

    let editButton = ElementCreator.createHTMLElement({
      tag: "button",
      props: { textContent: "Edit" },
      attrs: { class: "edit" },
      events: { click: this.toggleEdit.bind(this) },
    })

    let deleteButton = ElementCreator.createHTMLElement({
      tag: "button",
      props: { textContent: "Delete" },
      attrs: { class: "delete" },
      events: { click: this.deleteTask.bind(this) },
    })

    li.append(textDiv)
    li.append(buttonDiv)
    textDiv.append(inputCheckbox)
    textDiv.append(label)
    textDiv.append(inputText)
    buttonDiv.append(editButton)
    buttonDiv.append(deleteButton)

    return li
  }

  incompletedTasks() {
    let incompletedTask = document.querySelector(".incompleted-task")
    let newTask = this.getTextFromMainInput()
    let newElement = this.createElement(newTask)
    incompletedTask.append(newElement)
  }

  render() {
    let addButton = document.querySelector(".add-item__button")
    addButton.addEventListener("click", () => {
      this.incompletedTasks()
      this.clearInput()
    })
  }
}

let toDoList = new ToDoList()
toDoList.render()

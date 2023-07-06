import { ToDoList } from "./script.js"
import { setColorScheme } from "./toggle-theme.js"

let toDoList = new ToDoList()
toDoList.render()

setColorScheme()
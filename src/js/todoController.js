import { renderToDoBaseHTML, renderToDo } from "./todoInterface";
import {
  getLocalStorageData,
  saveLocalStorageData
} from "./localStorageController.js";
import { bindEventListeners } from "./eventListenerController";
import { v4 as uuidv4 } from "uuid";

//App state variables
let toDoArray = [];

const toDoFactory = (title, description, dueDate, priority, completed) => {
  const id = uuidv4();
  return { id, title, description, dueDate, priority, completed };
};

const loadToDoListFromLocal = array => {
  array.forEach(toDo => {
    renderToDo(toDo.title, toDo.id, toDo.completed);
  });
};

const addNewToDo = (title, description, dueDate, priority, completed) => {
  const newToDo = toDoFactory(title, description, dueDate, priority, completed);
  toDoArray.push(newToDo);
  renderToDo(newToDo.title, newToDo.id, newToDo.completed);
};

const toggleCompletedController = id => {
  toDoArray.forEach(toDo => {
    if (toDo.id == id) {
      toDo.completed = !toDo.completed;
    }
  });
};

const deleteToDo = id => {
  toDoArray = toDoArray.filter(toDo => toDo.id != id);
};

const saveData = () => {
  saveLocalStorageData(toDoArray);
};

const initializeApp = () => {
  renderToDoBaseHTML();
  //get data from localStorage
  let data = getLocalStorageData();
  //Loads local storage or initilizes values
  if (data) {
    toDoArray = JSON.parse(data);
    loadToDoListFromLocal(toDoArray);
  } else {
    toDoArray = [];
  }
  bindEventListeners();

  //Debug
  function resetLocalData() {
    localStorage.clear();
  }
  //resetLocalData();
};

export {
  initializeApp,
  addNewToDo,
  toggleCompletedController,
  deleteToDo,
  saveData
};

import { renderToDoBaseHTML, renderToDo } from "./todoInterface";
import {
  getLocalStorageData,
  saveLocalStorageData
} from "./localStorageController.js";
import { bindEventListeners } from "./eventListenerController";

//App state variables
let toDoArray = [];
let id = 0;

const toDoFactory = (title, description, dueDate, priority, completed) => {
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
  id++;
  renderToDo(title, id, completed);
};

const initializeApp = () => {
  renderToDoBaseHTML();
  //get data from localStorage
  let data = getLocalStorageData();
  //Loads local storage or initilizes values
  if (data) {
    toDoArray = JSON.parse(data);
    id = toDoArray.length;
    loadToDoListFromLocal(toDoArray);
  } else {
    toDoArray = [];
    id = 0;
  }
  bindEventListeners();
};

const toggleCompletedController = id => {
  toDoArray.forEach(toDo => {
    if (toDo.id == id) {
      toDo.completed = !toDo.completed;
    }
  });
};

const removeToDoController = id => {
  toDoArray = toDoArray.filter(toDo => toDo.id != id);
};

const saveDataController = () => {
  saveLocalStorageData(toDoArray);
};

export {
  initializeApp,
  addNewToDo,
  toggleCompletedController,
  removeToDoController,
  saveDataController
};

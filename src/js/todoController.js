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
    renderToDo(
      toDo.id,
      toDo.title,
      toDo.description,
      toDo.dueDate,
      toDo.priority,
      toDo.completed
    );
  });
};

const addNewToDo = (title, description, dueDate, priority, completed) => {
  const newToDo = toDoFactory(title, description, dueDate, priority, completed);
  toDoArray.push(newToDo);
  renderToDo(
    newToDo.id,
    newToDo.title,
    newToDo.description,
    newToDo.dueDate,
    newToDo.priority,
    newToDo.completed
  );
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

const updateToDo = id => {
  const title = document.getElementById(`title-${id}`).value;
  const description = document.getElementById(`description-${id}`).value;
  const priority = document.getElementById(`priority-${id}`).value;
  let dueDate = document.getElementById(`due-date-${id}`).value;
  if (dueDate === ""){
    dueDate = Date.now();
  }
  toDoArray.forEach(toDo => {
    if (toDo.id == id) {
      toDo.title = title;
      toDo.description = description;
      toDo.dueDate = dueDate;
      toDo.priority = priority;
    }
  });
  alert("Updated Succesfully");
  location.reload();
};

const initializeApp = () => {
  /* -------Debug-------*/
  function resetLocalData() {
    localStorage.clear();
  }
  //resetLocalData();
  /* ----------------------*/
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
};

export {
  initializeApp,
  addNewToDo,
  toggleCompletedController,
  deleteToDo,
  saveData,
  updateToDo
};

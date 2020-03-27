import { renderToDo, renderToDoBaseHTML } from "./todoInterface";
import {
  getLocalStorageData,
  setLocalStorageData
} from "./localStorageController.js";

//App state variables
let LIST = [];
let id = 0;

//Font-awesome class name constants
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

const loadToDoList = array => {
  array.forEach(toDo => {
    addToDo(toDo.name, toDo.id, toDo.done, toDo.trash);
  });
};

const addToDo = (toDoText, id, done, trash) => {
  if (trash) {
    return;
  }
  renderToDo(toDoText, id, done);
};

const bindEventListeners = () => {
  document.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
      const toDo = input.value;
      if (toDo) {
        addToDo(toDo, id, false, false);

        LIST.push({
          name: toDo,
          id: id,
          done: false,
          trash: false
        });

        setLocalStorageData(LIST);

        id++;
      }
      input.value = "";
    }
  });

  //complete to do
  function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
  }

  //remove to do
  function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
  }

  //target the items created dynamically
  document.getElementById("list").addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
      completeToDo(element);
    } else if (elementJob === "delete") {
      removeToDo(element);
    }

    setLocalStorageData(LIST);
  });
};

const initializeApp = () => {
  renderToDoBaseHTML();
  //get data from localStorage
  let data = getLocalStorageData();

  //check if data is not empty
  if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDoList(LIST);
  } else {
    LIST = [];
    id = 0;
  }
  bindEventListeners();
};

const getList = () => {
  return LIST;
};

const getId = () => {
  return id;
};

export { initializeApp, addToDo, getList, getId };

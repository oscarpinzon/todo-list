import "./css/style.css";
import "./css/fontawesome/fontawesome.css";
import "./js/todoInterface.js";
import { renderToDoBaseHTML, bindEventListeners } from "./js/todoInterface.js";
import {
  getLocalStorageData,
  setLocalStorageData
} from "./js/localStorageController.js";
import { loadToDoList } from "./js/todoController.js";

//Initialize application

//Render HTML
renderToDoBaseHTML();

//Element selectors
const listElement = document.getElementById("list");

//Font-awesome class name constants
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [],
  id = 0;

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

bindEventListeners(id, LIST);

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
listElement.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }

  setLocalStorageData(LIST);
});

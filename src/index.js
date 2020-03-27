import "./css/style.css";
import "./css/fontawesome/fontawesome.css";
import "./js/todoInterface.js";
import { renderToDoBaseHTML } from "./js/todoInterface.js";
import {
  getLocalStorageData,
  setLocalStorageData
} from "./js/localStorageController.js";

renderToDoBaseHTML();

//Element selectors
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Font-awesome class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [],
  id = 0;

//get item from localstorage
let data = getLocalStorageData();

//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

//load items to interface
function loadList(array) {
  array.forEach(item => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//add a To do

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
  <li class="item">
  <i class = "far ${DONE} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}" >${toDo}</p>
  <i class="fas fa-trash de" job="delete" id="${id}"></i>
  </li>
  `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//ad an item to the list when enter is pressed
document.addEventListener("keyup", function(event) {
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

addToDo("test", 1, false, true);

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
list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }

  setLocalStorageData(LIST);
});

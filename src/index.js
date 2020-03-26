import "./css/style.css";
import "./css/fontawesome/fontawesome.css";

function component() {
  const container = document.createElement("div");
  container.classList = "container";

  //Header
  const header = document.createElement("div");
  header.classList = "header";
  const clearDiv = document.createElement("div");
  clearDiv.classList = "clear";
  const refreshIcon = document.createElement("i");
  refreshIcon.classList = "fa fa-refresh";
  refreshIcon.setAttribute("aria-hidden", "true");
  clearDiv.appendChild(refreshIcon);
  header.appendChild(clearDiv);
  const date = document.createElement("div");
  date.id = "date";
  header.appendChild(date);
  container.appendChild(header);

  //Content
  const content = document.createElement("div");
  content.classList = "content";
  const list = document.createElement("ul");
  list.id = "list";
  content.appendChild(list);
  container.appendChild(content);

  //Add item
  const addItem = document.createElement("div");
  addItem.classList = "add-to-do";
  const addIcon = document.createElement("i");
  addIcon.classList = "fas fa-plus-circle";
  addIcon.setAttribute("aria-hidden", "true");
  addItem.appendChild(addIcon);
  const addInput = document.createElement("input");
  addInput.setAttribute("type", "text");
  addInput.id = "input";
  addInput.setAttribute("placeholder", "Add a to-do");
  addItem.appendChild(addInput);
  container.appendChild(addItem);

  return container;
}

document.body.appendChild(component());

//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [],
  id = 0;

//get item from localstorage
let data = localStorage.getItem("TODO");

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

// Show date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

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

      localStorage.setItem("TODO", JSON.stringify(LIST));

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

  localStorage.setItem("TODO", JSON.stringify(LIST));
});

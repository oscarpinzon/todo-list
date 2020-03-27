import { renderToDoBaseHTML, renderToDo, toggleCompleted, removeToDoTrashIcon } from "./todoInterface";
import {
  getLocalStorageData,
  setLocalStorageData
} from "./localStorageController.js";

//App state variables
let LIST = [];
let id = 0;

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
    toggleCompleted(element);
    LIST[element.id].done = LIST[element.id].done ? false : true;
  }

  //remove to do
  function removeToDo(element) {
    removeToDoTrashIcon(element)
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

  //Checks if data should be used
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

export { initializeApp };

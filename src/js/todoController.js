import {
  renderToDoBaseHTML,
  renderToDo,
  toggleCompleted,
  removeToDoFromInterface
} from "./todoInterface";
import {
  getLocalStorageData,
  saveLocalStorageData
} from "./localStorageController.js";

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

const bindEventListeners = () => {
  //When 'Enter' key is pressed
  const enterKeyCode = 13;
  document.addEventListener("keyup", event => {
    if (event.keyCode === enterKeyCode) {
      const inputText = input.value;
      if (inputText) {
        addNewToDo(inputText, "", new Date(), 1, false);
        saveLocalStorageData(toDoArray);
      }
      input.value = "";
    } else {
      return;
    }
  });

  //Complete Icon is bugged, how to access object with element.id and change the boolean property
  function completeIconClicked(element) {
    toggleCompleted(element);
    toDoArray.forEach(toDo => {
      if (toDo.id == element.id) {
        toDo.completed = !toDo.completed;
      }
    });
  }

  function deleteIconClicked(element) {
    removeToDoFromInterface(element);
    toDoArray = toDoArray.filter(toDo => {
      return toDo.id != element.id;
    });
  }

  //target the items created dynamically
  document.getElementById("list").addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob === "complete") {
      completeIconClicked(element);
    } else if (elementJob === "delete") {
      deleteIconClicked(element);
    }
    saveLocalStorageData(toDoArray);
  });
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

export { initializeApp };

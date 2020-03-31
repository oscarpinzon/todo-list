import {
  addNewToDo,
  toggleCompletedController,
  removeToDoController,
  saveDataController
} from "./todoController";
import {
  toggleCompletedInterface,
  removeToDoFromInterface
} from "./todoInterface";

const bindEventListeners = () => {
  bindEnterListener();
  bindToDoListListener();
};

const bindToDoListListener = () => {
  function completeIconClicked(element) {
    toggleCompletedInterface(element);
    toggleCompletedController(element.id);
  }

  function deleteIconClicked(element) {
    removeToDoFromInterface(element);
    removeToDoController(element.id);
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
    saveDataController();
  });
};

const bindEnterListener = () => {
  const enterKeyCode = 13;
  document.addEventListener("keyup", event => {
    if (event.keyCode === enterKeyCode) {
      const inputText = input.value;
      if (inputText) {
        addNewToDo(inputText, "", new Date(), 1, false);
        saveDataController();
      }
      input.value = "";
    } else {
      return;
    }
  });
};

export { bindEventListeners };

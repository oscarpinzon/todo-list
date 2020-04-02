import {
  addNewToDo,
  toggleCompletedController,
  deleteToDo,
  saveData
} from "./todoController";
import {
  toggleCompletedInterface,
  removeToDoFromInterface
} from "./todoInterface";

const bindEventListeners = () => {
  bindEnterListener();
  bindListListener();
};

const bindListListener = () => {
  function completeIconClicked(element) {
    toggleCompletedInterface(element);
    toggleCompletedController(element.id);
  }

  function deleteIconClicked(element) {
    removeToDoFromInterface(element);
    deleteToDo(element.id);
  }

  //target the items created dynamically
  document.getElementById("list").addEventListener("click", function(event) {
    const element = event.target;
    if (element.hasAttribute("data-job")) {
      const elementJob = element.dataset.job;
      if (elementJob === "complete") {
        completeIconClicked(element);
      } else if (elementJob === "delete") {
        deleteIconClicked(element);
      }
      saveData();
    }
    return;
  });
};

const bindEnterListener = () => {
  const enterKeyCode = 13;
  document.addEventListener("keyup", event => {
    if (event.keyCode === enterKeyCode) {
      const inputText = input.value;
      if (inputText) {
        addNewToDo(inputText, "", new Date(), 1, false);
        saveData();
      }
      input.value = "";
    } else {
      return;
    }
  });
};

export { bindEventListeners };

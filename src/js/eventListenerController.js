const bindEventListeners = () => {
  bindEnterListener();
  bindToDoListListener();
};

const bindToDoListListener = () => {
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

const bindEnterListener = () => {
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
};

export { bindEventListeners };

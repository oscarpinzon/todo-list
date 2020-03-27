import { renderToDo } from "./todoInterface";

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

export { loadToDoList, addToDo };

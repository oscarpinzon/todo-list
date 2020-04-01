//Font-awesome class name constants
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

const renderToDoBaseHTML = () => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();
  const todayString = today.toLocaleDateString("en-US", options);
  const baseHTML = `
    <div class="container">
      <div class="mx-auto todo-container">
        <div class="header">
          <div id="date">${todayString}</div>
        </div>
        <div class="content">
          <ul id="list"></ul>
        </div>
        <div class="add-to-do row no-gutters">
          <i class="fas fa-plus-circle col-1" aria-hidden="true"></i>
          <input type="text" class="col-10" id="input" placeholder="Add a to-do"></input>
        </div>
      </div>
    </div>
    `;
  const position = "afterbegin";
  document.body.insertAdjacentHTML(position, baseHTML);
};

const renderToDo = (title, id, completed) => {
  //Font-awesome class name constants
  const CHECK = "fa-check-circle";
  const UNCHECK = "fa-circle";
  const LINE_THROUGH = "lineThrough";

  const doneIcon = completed ? CHECK : UNCHECK;
  const lineStyle = completed ? LINE_THROUGH : "";

  const element = `
    <li class="row no-gutters justify-content-center align-items-center item">
      <i class = "col-1 far ${doneIcon} co" job="complete" id="${id}"></i>
      <p class="col-10 text ${lineStyle}" >${title}</p>
      <i class="col-1 fas fa-trash de text-right" job="delete" id="${id}"></i>
    </li>
    `;

  const position = "beforeend";
  document.getElementById("list").insertAdjacentHTML(position, element);
};

const toggleCompletedInterface = element => {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
};

const removeToDoFromInterface = element => {
  element.parentNode.parentNode.removeChild(element.parentNode);
};

export {
  renderToDoBaseHTML,
  renderToDo,
  toggleCompletedInterface,
  removeToDoFromInterface
};

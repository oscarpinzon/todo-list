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
        <div class="header">
            <div class="clear">
                <i class="fa fa-refresh" aria-hidden="true"></i> 
            </div>
            <div id="date">${todayString}</div>
        </div>
        <div class="content">
            <ul id="list"></ul>
        </div>
        <div class="add-to-do">
            <i class="fas fa-plus-circle" aria-hidden="true"></i>
            <input type="text" id="input" placeholder="Add a to-do"></input>
        </div>
    </div>
    `;
  const position = "afterbegin";
  document.body.insertAdjacentHTML(position, baseHTML);
};

const renderToDo = (toDoText, id, done) => {
  //Font-awesome class name constants
  const CHECK = "fa-check-circle";
  const UNCHECK = "fa-circle";
  const LINE_THROUGH = "lineThrough";

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const element = `
    <li class="item">
    <i class = "far ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}" >${toDoText}</p>
    <i class="fas fa-trash de" job="delete" id="${id}"></i>
    </li>
    `;

  const position = "beforeend";
  document.getElementById("list").insertAdjacentHTML(position, element);
};

const toggleCompleted = element => {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
};

const removeToDoTrashIcon = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
}

export { renderToDoBaseHTML, renderToDo, toggleCompleted, removeToDoTrashIcon };

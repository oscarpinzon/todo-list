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

const renderToDo = (title, id, completed) => {
  //Font-awesome class name constants
  const CHECK = "fa-check-circle";
  const UNCHECK = "fa-circle";
  const LINE_THROUGH = "lineThrough";

  const doneIcon = completed ? CHECK : UNCHECK;
  const lineStyle = completed ? LINE_THROUGH : "";

  const element = `
    <li class="item">
    <i class = "far ${doneIcon} co" job="complete" id="${id}"></i>
    <p class="text ${lineStyle}" >${title}</p>
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

const removeToDoFromInterface = element => {
  element.parentNode.parentNode.removeChild(element.parentNode);
};

export { renderToDoBaseHTML, renderToDo, toggleCompleted, removeToDoFromInterface };

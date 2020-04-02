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
      <div class = "row no-gutters">
        <div class="mx-auto col-lg-8">
        <div class="header d-flex align-items-end">
          <div id="date">${todayString}</div>
        </div>
        <div class="content">
          <ul id="list"></ul>
        </div>
        <div class="add-to-do row no-gutters">
          <div class="justify-content-center align-items-center">
            <i class="fas fa-plus-circle col-1" aria-hidden="true"></i>
          </div>
          <input type="text" class="col-9" id="input" placeholder="Add a To Do"></input>
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
      <i class = "col-1 far ${doneIcon} icon done-icon" data-job="complete" id="${id}"></i>
      <p class="col-9 text-break text ${lineStyle}" >${title}</p>
      <i class="col-1 fas fa-trash icon trash-icon" data-job="delete" id="${id}"></i>
      <button class="col-1 my-btn" type="button" data-toggle="collapse" data-target="#form-${id}" aria-expanded="false" aria-controls="form-${id}">
        <i class="fas fa-caret-down options-icon"></i>
      </button>
      <div class="collapse col-12 form-container" id="form-${id}">
        <form class="row no-gutters justify-content-center align-items-center">
          <div class="form-group col-10">
            <div class="row no-gutters justify-content-center align-items-center">
              <label for="title-${id}" class="col-2">Title</label>
              <input type="text" class="form-control col-10" id="title-${id}" aria-describedby="titleHelp" value="${title}"> 
            </div>
          </div>
          <div class="w-100"></div>
          <div class="form-group col-10">
            <label for="description-${id}">Description</label>
            <textarea class="form-control" id="description-${id}" value=" " row="3"></textarea>
          </div>
          <div class="w-100"></div>
          <div class="form-group col-10">
            <div class="row no-gutters justify-content-center align-items-center">
              <label for="due-date-${id}" class="col-4">Due date</label>
              <input class="form-control col-8 date-input" type="date" id="due-date-${id}" name="due-date-${id}">
            </div>
          </div>
          <div class="w-100"></div>
          <div class="form-group col-10">
            <div class="row no-gutters justify-content-center align-items-center">
              <label for="priority-${id}" class="col-4">Priority</label>
              <select class="form-control col-8" id="priority-${id}">
                <option>High</option>
                <option>Normal</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary col-8">Update</button>
        </form>
      </div>
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

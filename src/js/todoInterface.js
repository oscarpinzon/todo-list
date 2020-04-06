import differenceInDays from "date-fns/differenceInDays";
import { format, parseISO } from "date-fns";
//Font-awesome class name constants
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

const renderToDoBaseHTML = () => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();
  const todayString = today.toLocaleDateString("en-US", options);
  const baseHTML = `
    <div class="container-fluid">
      <div class = "row no-gutters">
        <div class="mx-auto col-lg-6">
        <div class="header d-flex align-items-end">
          <div id="date">${todayString}</div>
        </div>
        <div class="content">
          <ul id="list"></ul>
        </div>
        <div class="add-to-do row no-gutters">
          <div class="justify-content-center align-items-center" id="enter-icon">
            <i class="fas fa-plus-circle col-2" aria-hidden="true" ></i>
          </div>
          <input type="text" class="col-9" id="input" placeholder="Add a To Do"></input>
        </div>
      </div>
    </div>
    `;
  const position = "afterbegin";
  document.body.insertAdjacentHTML(position, baseHTML);
};

const renderToDo = (id, title, description, dueDate, priority, completed) => {
  //Font-awesome class name constants
  const CHECK = "fa-check-circle";
  const UNCHECK = "fa-circle";
  const LINE_THROUGH = "lineThrough";

  const doneIcon = completed ? CHECK : UNCHECK;
  const lineStyle = completed ? LINE_THROUGH : "";

  const daysUntilDue = differenceInDays(new Date(dueDate), Date.now());
  let daysUntilDueString = "";
  if (daysUntilDue === 0) {
    daysUntilDueString = "Due Today" 
  }
  else if (daysUntilDue === 1) {
    daysUntilDueString = "Due Tomorrow"
  }
  else if (daysUntilDue === -1) {
    daysUntilDueString = "Due Yesterday"
  }
  else if (daysUntilDue < -1) {
    daysUntilDueString = `Due ${daysUntilDue} days ago`
  }
  else if (daysUntilDue > 1){
    daysUntilDueString = `Due in ${daysUntilDue} days`
  }

  const element = `
    <li class="row no-gutters justify-content-center align-items-center item">
    
      <i class = "col-1 far ${doneIcon} icon done-icon" data-job="complete" id="${id}"></i>
      <p class="col-6 text-break text ${lineStyle}" >${title}</p>
      <p class="col-2 text-center text-muted due-date">${daysUntilDueString}</p>
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
          
          <div class="form-group col-10">
            <label for="description-${id}">Description</label>
            <textarea class="form-control" id="description-${id}" row="3">${description}</textarea>
          </div>

          <div class="form-group col-10">
            <div class="row no-gutters justify-content-center align-items-center">
              <label for="due-date-${id}" class="col-4">Due date</label>
              <input class="form-control col-8 date-input" type="date" id="due-date-${id}" name="due-date-${id}">
            </div>
          </div>

          <div class="form-group col-10">
            <div class="row no-gutters justify-content-center align-items-center">
              <label for="priority-${id}" class="col-4">Priority</label>
              <select class="form-control col-8" id="priority-${id}">
                <option value="high" ${
                  priority === "high" ? "selected" : ""
                }>High</option>
                <option value="normal" ${
                  priority === "normal" ? "selected" : ""
                }>Normal</option>
                <option value="low" ${
                  priority === "low" ? "selected" : ""
                }>Low</option>
              </select>
            </div>
          </div>
          
          <div class="w-100"></div>

          <button type="button" class="btn btn-primary col-10 update-btn" data-job="update" id="${id}">Update</button>
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

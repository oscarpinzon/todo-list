import "./css/style.css";
import "./css/fontawesome/fontawesome.css";
import { initializeApp } from "./js/todoController.js";

//Debug?
function resetLocalData() {
  localStorage.clear();
}
//resetLocalData();

initializeApp();

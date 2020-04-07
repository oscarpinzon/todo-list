import {
  addNewToDo,
  toggleCompletedController,
  deleteToDo,
  saveData,
  updateToDo
} from './todoController'
import {
  toggleCompletedInterface,
  removeToDoFromInterface
} from './todoInterface'

const bindEventListeners = () => {
  bindEnterListener()
  bindListListener()
  bindIconListener()
}

const bindListListener = () => {
  function completeIconClicked (element) {
    toggleCompletedInterface(element)
    toggleCompletedController(element.id)
  }

  function deleteIconClicked (element) {
    removeToDoFromInterface(element)
    deleteToDo(element.id)
  }

  function updateBtnClicked (id) {
    updateToDo(id)
  }

  // target the items created dynamically
  document.getElementById('list').addEventListener('click', function (event) {
    const element = event.target
    if (element.hasAttribute('data-job')) {
      const elementJob = element.dataset.job
      if (elementJob === 'complete') {
        completeIconClicked(element)
      } else if (elementJob === 'delete') {
        deleteIconClicked(element)
      } else if (elementJob === 'update') {
        updateBtnClicked(element.id)
      }
      saveData()
    }
  })
}

const bindEnterListener = () => {
  const enterKeyCode = 13
  document.addEventListener('keyup', (event) => {
    if (event.keyCode === enterKeyCode) {
      const inputText = document.getElementById('input').value
      if (inputText) {
        // Adds the new ToDo with a set of default values
        addNewToDo(inputText, '', Date.now(), 'normal', false)
        saveData()
      }
      document.getElementById('input').value = ''
    }
  })
}

const bindIconListener = () => {
  document.getElementById('enter-icon').addEventListener('click', () => {
    const inputText = document.getElementById('input').value
    if (inputText) {
      // Adds the new ToDo with a set of default values
      addNewToDo(inputText, '', Date.now(), 'normal', false)
      saveData()
      document.getElementById('input').value = ''
    }
  })
}

export { bindEventListeners }

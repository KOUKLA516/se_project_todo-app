import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const addTodoButton = document.querySelector(".button_action_add");
  const addTodoForm = document.forms["add-todo-form"];

  // validator instance for the add-todo form
  const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
  addTodoFormValidator.enableValidation();

  // instantiate TodoCounter
  const todoCounter = new TodoCounter(initialTodos, ".counter__text");

  const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template", todoCounter);
    return todo.getView();
  };

  const renderTodo = (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  };

  // instantiate section
  const section = new Section({
    items: initialTodos,
    renderer: renderTodo,
    containerSelector: ".todos__list",
  });

  section.renderItems();

  // instantiate PopupWithForm for adding new to-dos
  const addTodoPopupWithForm = new PopupWithForm(
    "#add-todo-popup",
    (formData) => {
      console.log("Processed Form Data: ", formData); // debugging

      // date and adjust for timezone
      const date = new Date(formData.date);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      // create the new to-do object
      const newTodo = {
        name: formData.name,
        date,
        id: uuidv4(),
        completed: false,
      };

      renderTodo(newTodo); // reuse renderTodo
      addTodoPopupWithForm.close(); // close the popup after adding

      // update TodoCounter and reset the form validator
      todoCounter.updateTotal(true);
      addTodoFormValidator.resetValidation();
    },
    addTodoFormValidator // pass the form validator instance here
  );

  // set event listeners for the popup
  addTodoPopupWithForm.setEventListeners();

  // add event listener to open the add-to-do popup
  addTodoButton.addEventListener("click", () => {
    addTodoPopupWithForm.open();
  });
});
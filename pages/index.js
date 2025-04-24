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
  const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

  // validator
  const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
  addTodoFormValidator.enableValidation();

  // instantiate TodoCounter
  const todoCounter = new TodoCounter(initialTodos, ".counter__text");

  // function to generate a todo and ensure todoCounter is passed
  const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template", todoCounter);
    return todo.getView();
  };

  // function to render todos
  const renderTodo = (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  };

  // instantiate Section
  const section = new Section({
    items: initialTodos,
    renderer: renderTodo,
    containerSelector: ".todos__list",
  });

  // render initial items
  section.renderItems();

  // instantiate PopupWithForm
  const addTodoPopupWithForm = new PopupWithForm("#add-todo-popup", (formData) => {
    console.log("formData:", formData); // debug: check values

    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const newTodo = {
      name: formData.name,
      date,
      id: uuidv4(),
      completed: false,
    };

    const todoElement = generateTodo(newTodo);
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    addTodoFormValidator.resetValidation();
  });

  // set event listeners for the popup
  addTodoPopupWithForm.setEventListeners();

  // open popup event listener
  addTodoButton.addEventListener("click", () => {
    addTodoPopupWithForm.open();
  });
});

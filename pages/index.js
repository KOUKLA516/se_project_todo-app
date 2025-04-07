import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

// Validator
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

// Function to create a Todo DOM element
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Renderer function for Section
const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
};

// Section instance: handles rendering and adding to-do items
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
section.renderItems();

// TodoCounter instance
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// PopupWithForm instance
const addTodoPopupWithForm = new PopupWithForm("#add-todo-popup", (formData) => {
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
addTodoPopupWithForm.setEventListeners();

// Open popup on button click
addTodoButton.addEventListener("click", () => {
  addTodoPopupWithForm.open();
});

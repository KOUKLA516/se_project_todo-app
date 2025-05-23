class Todo {
  constructor(data, selector, counter) {
    this._data = data;          // use _ for private properties
    this._counter = counter;     // use _ for private properties
    this._templateElement = document.querySelector(selector); // use _ for private properties
  }

  _setEventListeners() {
    // delete button handler
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();

      // check if counter exists before calling methods
      if (this._counter) {
        this._counter.updateTotal(false);
        if (this._data.completed) {
          this._counter.updateCompleted(false);
        }
      }
    });

    // checkbox handler
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;

      // ensure method exists before calling
      if (this._counter && typeof this._counter.updateCompleted === "function") {
        this._counter.updateCompleted(this._data.completed);
      }
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    // handle due date
    if (this._data.date) {
      const dueDate = new Date(this._data.date);
    
      if (!isNaN(dueDate.getTime())) { 
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      } else {
        todoDate.textContent = "";
      }
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
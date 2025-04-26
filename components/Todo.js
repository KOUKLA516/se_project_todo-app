class Todo {
  constructor(data, selector, counter) {
    this.data = data;
    this.counter = counter; 
    this.templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    // delete button handler
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();

      // check if counter exists before calling methods
      if (this.counter) {
        this.counter.updateTotal(false);
        if (this.data.completed) {
          this.counter.updateCompleted(false);
        }
      }
    });

    // checkbox handler
    this._todoCheckboxEl.addEventListener("change", () => {
      this.data.completed = !this.data.completed;

      // ensure method exists before calling
      if (this.counter && typeof this.counter.updateCompleted === "function") {
        this.counter.updateCompleted(this.data.completed);
      }
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this.data.completed;
    this._todoCheckboxEl.id = `todo-${this.data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this.data.id}`);
  }

  getView() {
    this._todoElement = this.templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this.data.name;
    // handle due date
    if (this.data.date) {
      const dueDate = new Date(this.data.date);
    
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
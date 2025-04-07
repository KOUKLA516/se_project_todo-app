class Todo {
    constructor(data, selector, counter) {
      this.data = data;
      this.counter = counter; // 👈 save counter reference
      this.templateElement = document.querySelector(selector);
    }
  
    _setEventListeners() {
      // delete button handler
      this._todoDeleteBtn.addEventListener("click", () => {
        this._todoElement.remove();
  
        // Update counter when item is removed
        this.counter.updateTotal(false);
        if (this.data.completed) {
          this.counter.updateCompleted(false);
        }
      });
  
      // checkbox handler
      this._todoCheckboxEl.addEventListener("change", () => {
        this.data.completed = !this.data.completed;
  
        // Update completed count
        this.counter.updateCompleted(this.data.completed); // 👈 pass true or false
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
  
      // Handle due date
      if (this.data.date) {
        const dueDate = new Date(this.data.date);
        if (!isNaN(dueDate)) {
          todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}`;
        }
      }
  
      this._generateCheckboxEl();
      this._setEventListeners();
  
      return this._todoElement;
    }
  }
  
  export default Todo;
  
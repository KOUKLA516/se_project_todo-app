class Todo {
    constructor(data, selector) {
        this.data = data;
        this.templateElement = document.querySelector(selector);
    }

    _setEventListeners() {
        // delete button handler
        this._todoDeleteBtn.addEventListener("click", () => {
            this._todoElement.remove();
        });

        // checkbox handler
        this._todoCheckboxEl.addEventListener("change", () => {
            this.data.completed = !this.data.completed;
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
        this._setEventListeners(); // Ensure event listeners are set up

        return this._todoElement;
    }
}

export default Todo;

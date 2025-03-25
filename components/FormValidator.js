class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;
        this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
            return false;
        } else {
            this._hideInputError(inputElement);
            return true;
        }
    }

    _toggleButtonState() {
        const isFormValid = this._inputList.every(input => input.validity.valid);
        if (isFormValid) {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        } else {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
    }

    _setEventListeners() {
        this._toggleButtonState(); 

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            this.resetValidation();  // here
            evt.preventDefault();
          });

          resetValidation() 
            this._formEl.reset();  // reset the form
            this._inputList.forEach((inputElement) => {
              this._hideInputError(inputElement);
            });
            this._toggleButtonState();
          }
}

export default FormValidator;

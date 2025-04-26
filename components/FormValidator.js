class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
      this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
    }
  
    isValid() {
      // check if all inputs are valid
      return this._inputList.every((input) => input.validity.valid);
    }
  
    showInputError(input, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if (errorElement) {
        errorElement.textContent = errorMessage; // show error message
        errorElement.classList.add(this._config.errorClass); 
      }
      input.classList.add(this._config.inputErrorClass); 
    }
  
    hideInputError(input) {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if (errorElement) {
        errorElement.textContent = ""; // clear error message
        errorElement.classList.remove(this._config.errorClass); 
      }
      input.classList.remove(this._config.inputErrorClass); 
    }
  
    resetValidation() {
      // clear input errors and update button state
      this._inputList.forEach((input) => this.hideInputError(input));
      this._toggleButtonState();
    }
  
    _toggleButtonState() {
      if (this.isValid()) {
        this._buttonElement.removeAttribute("disabled");
      } else {
        this._buttonElement.setAttribute("disabled", "disabled");
      }
    }
  
    _checkInputValidity(input) {
      if (!input.validity.valid) {
        this.showInputError(input, input.validationMessage);
      } else {
        this.hideInputError(input);
      }
    }
  
    enableValidation() {
      // add event listeners to inputs for real-time validation
      this._inputList.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input);
          this._toggleButtonState(); 
        });
      });
  
      this._toggleButtonState();
    }
  }
  
  export default FormValidator;
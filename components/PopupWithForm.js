import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validatorInstance) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validator = validatorInstance; 
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value.trim(); 
      console.log(`Captured input - ${input.name}: ${input.value}`); // debugging
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      if (this._validator.isValid()) {
        const formData = this._getInputValues();

        if (formData.name && formData.date) { 
          console.log("Submitting form with data: ", formData); // debugging
          this._handleFormSubmit(formData);
          this._form.reset();
          this._validator.resetValidation(); 
          this.close();
        } else {
          console.warn("Form submission blocked - Missing required input values.");
        }
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._validator.resetValidation(); 
  }
}

export default PopupWithForm;
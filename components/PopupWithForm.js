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
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const formData = this._getInputValues();
      this._handleFormSubmit(formData); // delegate form-specific logic
      this._form.reset();
      this._validator.resetValidation();
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._validator.resetValidation();
  }
}

export default PopupWithForm;

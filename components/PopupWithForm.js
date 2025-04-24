import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");

    console.log("popup selector:", popupSelector);
    console.log("this._popup:", this._popup);
    console.log("this._form:", this._form);

    this._inputList = this._form.querySelectorAll("input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  

  setEventListeners() {
    super.setEventListeners();

    console.log("Form element:", this._form);
    console.log("Inputs inside form:", this._form.querySelectorAll("input"));
    

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      console.log("Input values before submission:", inputValues);
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
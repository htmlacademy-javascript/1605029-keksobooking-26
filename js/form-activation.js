import {disableSlider, enableSlider} from './form-slider.js';

const FORM_CLASS = 'ad-form';
const FILTERS_CLASS = 'map__filters';


function disableForm () {
  const formElement = document.querySelector(`.${FORM_CLASS}`);
  formElement.classList.add(`${FORM_CLASS}--disabled`);

  for (const fieldset of formElement.children) {
    fieldset.setAttribute('disabled', 'disabled');
  }

  disableSlider();
}


function enableForm () {
  const formElement = document.querySelector(`.${FORM_CLASS}`);

  for (const fieldset of formElement.children) {
    fieldset.removeAttribute('disabled', 'disabled');
  }

  enableSlider();

  formElement.classList.remove(`${FORM_CLASS}--disabled`);
}


function disableFilters () {
  const filtersElement = document.querySelector(`.${FILTERS_CLASS}`);
  filtersElement.classList.add(`${FILTERS_CLASS}--disabled`);

  for (const fieldset of filtersElement.children) {
    fieldset.setAttribute('disabled', 'disabled');
  }
}


function enableFilters () {
  const filtersElement = document.querySelector(`.${FILTERS_CLASS}`);

  for (const fieldset of filtersElement.children) {
    fieldset.removeAttribute('disabled', 'disabled');
  }

  filtersElement.classList.remove(`${FILTERS_CLASS}--disabled`);
}


export {
  disableForm,
  enableForm,
  disableFilters,
  enableFilters
};

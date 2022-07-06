import {MAX_PRICE} from './form-data.js';

const formElement = document.querySelector('.ad-form');
const sliderElement = formElement.querySelector('.ad-form__slider');
const priceElement = formElement.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

const slider = sliderElement.noUiSlider;

function onSliderChange (executeFunction) {
  slider.on('change', () => {
    executeFunction();
  });
}

function disableSlider () {
  sliderElement.setAttribute('disabled', true);
}

function enableSlider () {
  sliderElement.removeAttribute('disabled');
}

slider.on('update', () => {
  priceElement.value = slider.get();
});

priceElement.addEventListener('change', (evt) => {
  slider.set(evt.target.value);
});

export {onSliderChange, disableSlider, enableSlider};

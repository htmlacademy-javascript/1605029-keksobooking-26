import {
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  MAX_PRICE,
  minPrice,
  roomsCapacity
} from './form-data.js';

import {onSliderChange, setSliderValue} from './form-slider.js';
import {DEFAULT_LAT, DEFAULT_LNG} from './map.js';
import {sendData} from './api.js';

const formElement = document.querySelector('.ad-form');
const addressElement = formElement.querySelector('#address');
const priceElement = formElement.querySelector('#price');
const housingTypeElement = formElement.querySelector('#type');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');


// Делаем так, чтобы Pristine не выдавала свои дефолтные сообщения об ошибках
// на нужных нам полях, на которые дальше вешаем свои обработчики.
// Добавляем валидацию для атрибутов, делаем, чтобы Pristine не возвращала ошибку.
const VALIDATED_FIELDS_ATTRIBUTES = [
  'required', 'minlength', 'maxlength', 'min', 'max'
];

VALIDATED_FIELDS_ATTRIBUTES.forEach(
  (attribute) => Pristine.addValidator(attribute, () => true)
);


const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'validation-error'
});


// Проверка заголовка
function validateTitle (value) {
  return value.length >= TITLE_MIN_LENGTH
    && value.length <= TITLE_MAX_LENGTH;
}

// Проверка цены за ночь
function validatePrice (value) {
  return value.length
    && parseInt(value, 10) >= minPrice[housingTypeElement.value]
    && parseInt(value, 10) <= MAX_PRICE;
}

function getPriceErrorMessage () {
  return `От ${minPrice[housingTypeElement.value]} до ${MAX_PRICE} рублей`;
}

// Проверка цены за ночь при изменении типа жилья
function onHousingTypeChange () {
  priceElement.placeholder = minPrice[this.value];
  priceElement.min = minPrice[this.value];
  pristine.validate(priceElement);
}

// Проверка на соответствие количества комнат и количества мест
function validateRoomsCapacity () {
  return roomsCapacity[parseInt(roomNumberElement.value, 10)]
    .includes(parseInt(capacityElement.value, 10));
}

// Синхронизация времени заезда и выезда
function onTimeinChange () {
  timeOutElement.value = this.value;
}

function onTimeoutChange () {
  timeInElement.value = this.value;
}


// Установка валидации формы
function setFormValidation () {
  pristine.addValidator(
    formElement.querySelector('#title'),
    validateTitle,
    `От ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`,
  );

  pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

  // Проверка цены за ночь при перемещении ползунка слайдера
  onSliderChange(() => {
    pristine.validate(priceElement);
  });

  housingTypeElement.addEventListener('change', onHousingTypeChange);

  pristine.addValidator(
    roomNumberElement,
    validateRoomsCapacity,
    'Измените количество комнат'
  );

  pristine.addValidator(
    capacityElement,
    validateRoomsCapacity,
    'Измените количество гостей'
  );

  roomNumberElement.addEventListener('change', () => {
    pristine.validate(capacityElement);
  });

  capacityElement.addEventListener('change', () => {
    pristine.validate(roomNumberElement);
  });

  timeInElement.addEventListener('change', onTimeinChange);
  timeOutElement.addEventListener('change', onTimeoutChange);
}


function setUserFormSubmit (onSuccess, onFail) {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => {
          evt.target.reset();
          onSuccess();
        },
        onFail,
        new FormData(evt.target)
      );
    }
  });
}


formElement.addEventListener('reset', () => {
  setSliderValue(0);
  setTimeout(() => {
    addressElement.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
  }, 0);
});

export {setFormValidation, setUserFormSubmit};

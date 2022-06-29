// Управление активностью формы по классу
function manageFormDisablingByClass (formClass, disablingValue) {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.children;

  if (disablingValue) {
    form.classList.add(`${formClass}--disabled`);
    for (const fieldset of formElements) {
      fieldset.setAttribute('disabled', 'disabled');
    }
  } else {
    form.classList.remove(`${formClass}--disabled`);
    for (const fieldset of formElements) {
      fieldset.removeAttribute('disabled', 'disabled');
    }
  }
}

/*manageFormDisablingByClass('ad-form', 'disabled');*/
manageFormDisablingByClass('map__filters', true);


const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'validation-error'
});


// Проверка заголовка
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

function validateTitle (value) {
  return value.length >= TITLE_MIN_LENGTH
    && value.length <= TITLE_MAX_LENGTH;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  `От ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`,
);


// Проверка цены за ночь
const priceField = adForm.querySelector('#price');
const MAX_PRICE = 100000;
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

function validatePrice (value) {
  const housingType = adForm.querySelector('#type');
  return value.length
    && parseInt(value, 10) >= MIN_PRICE[housingType.value]
    && parseInt(value, 10) <= MAX_PRICE;
}

function getPriceErrorMessage () {
  const housingType = adForm.querySelector('#type');
  return `От ${MIN_PRICE[housingType.value]} до ${MAX_PRICE} рублей`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

// Проверка цены за ночь при изменении типа жилья
function onHousingTypeChange () {
  priceField.placeholder = MIN_PRICE[this.value];
  pristine.validate(priceField);
}

adForm.querySelector('#type').addEventListener('change', onHousingTypeChange);


// Проверка на соответствие количества комнат и количества мест
const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const ROOMS_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

function validateRoomsCapacity () {
  return ROOMS_CAPACITY[parseInt(roomsField.value, 10)].includes(parseInt(capacityField.value, 10));
}

pristine.addValidator(roomsField, validateRoomsCapacity, 'Измените количество комнат');
pristine.addValidator(capacityField, validateRoomsCapacity, 'Измените количество гостей');

roomsField.addEventListener('change', () => {
  pristine.validate(capacityField);
});

capacityField.addEventListener('change', () => {
  pristine.validate(roomsField);
});


// Синхронизация времени заезда и выезда
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');

function onTimeinChange () {
  timeoutField.value = this.value;
}

function onTimeoutChange () {
  timeinField.value = this.value;
}

timeinField.addEventListener('change', onTimeinChange);
timeoutField.addEventListener('change', onTimeoutChange);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

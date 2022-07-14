const ALERT_SHOW_TIME = 6000;

// Получить случайное целое число из диапазона включительно.
function getRandomInteger (start, end) {
  let min = Math.min(start, end);
  let max = Math.max(start, end);

  if ((min < 0) && (max < 0)) {
    return;
  }

  min = min < 0 ? 0 : Math.ceil(min);
  max = max < 0 ? 0 : Math.floor(max);

  return min === max ? min : Math.floor(Math.random() * (max - min + 1) + min);
}


// Получить случайное число с плавающей точкой из диапазона включительно.
function getRandomNumber (start, end, symbolsAfterComma) {
  if (symbolsAfterComma === 0) {
    return getRandomInteger(start, end);
  }

  if ((start < 0) && (end < 0)) {
    return;
  }

  let min = Math.min(start, end);
  let max = Math.max(start, end);

  min = min < 0 ? 0 : min;
  max = max < 0 ? 0 : max;

  const randomNumber = Math.random() * (max - min) + min;
  return +randomNumber.toFixed(symbolsAfterComma);
}


// Получить случайный элемент массива.
function getRandomArrayElement (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}


// Получить перемешанный массив случайной длины
// из уникальных элементов заданного массива
function getShuffledUniqueElements (elements) {
  const elementsCount = getRandomInteger(1, elements.length);
  const shuffledElements = [];

  while (shuffledElements.length < elementsCount) {
    const randomIndex = getRandomInteger(0, elementsCount - 1);
    if (!shuffledElements.includes(elements[randomIndex])) {
      shuffledElements.push(elements[randomIndex]);
    }
  }

  return shuffledElements;
}


function isEscapeKey (evt) {
  return evt.key === 'Escape';
}


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '200px';
  alertContainer.style.right = '0';
  alertContainer.style.width = '500px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.padding = '40px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#000000';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.style.border = '4px solid black';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {
  getRandomInteger,
  getRandomNumber,
  getRandomArrayElement,
  getShuffledUniqueElements,
  isEscapeKey,
  showAlert,
  debounce
};

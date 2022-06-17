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

export {getRandomInteger, getRandomNumber, getRandomArrayElement, getShuffledUniqueElements};

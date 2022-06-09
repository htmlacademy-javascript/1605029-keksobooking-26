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

  const multiplier = Math.pow(10, symbolsAfterComma);
  // Проверка на равенство значений начала и конца интервала, если обрезать их до заданного количества символов после точки
  if (Math.floor(min * multiplier) / multiplier === Math.floor(max * multiplier) / multiplier) {
    return Math.floor(min * multiplier) / multiplier;
  }

  const randomNumber = Math.random() * (max - min) + min;
  return +randomNumber.toFixed(symbolsAfterComma);
}

getRandomInteger(1, 3);
getRandomNumber(1, 3, 4);

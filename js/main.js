const AVATAR_COUNT = 10;
const AVATAR_REPLACE_STRING = '_PICTURE_NUMBER_';
const AVATAR_PICTURE_SRC = `img/avatars/user${AVATAR_REPLACE_STRING}.png`;
const OFFER_TITLES = [
  'Отличное жильё!',
  'Классная квартира в самом центре',
  'Стильно, круто, дорого!'
];
const OFFER_DESCRIPTIONS = [
  'Элитный жилой комплекс. Отличное месторасположение. Всего 5 минут от метро.',
  'Сдаётся в аренду на любой срок. Чистая и уютная квартира. Есть вся мебель и техника.',
  'Посуточная аренда. Закрытый двор. Развитая инфраструктура.'
];
const MAX_PRICE = 100000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 10;
const HOUSING_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const PHOTOS =  [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;
const LOCATION_DIGITS = 5;

const ADVERTISEMENTS_COUNT = 10;

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

function getAvatarSrc () {
  const pictureNumber = String(getRandomInteger(0, AVATAR_COUNT)).padStart(2, '0');
  return AVATAR_PICTURE_SRC.replace(AVATAR_REPLACE_STRING, pictureNumber);
}

function createAuthor () {
  return {
    avatar: getAvatarSrc()
  };
}

function createOffer (location) {
  return {
    title: getRandomArrayElement(OFFER_TITLES),
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInteger(10, MAX_PRICE),
    type: getRandomArrayElement(HOUSING_TYPE),
    rooms: getRandomInteger(1, MAX_ROOMS),
    guests: getRandomInteger(1, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKIN_TIME),
    features: getShuffledUniqueElements(FEATURES),
    description: getRandomArrayElement(OFFER_DESCRIPTIONS),
    photos: getShuffledUniqueElements(PHOTOS)
  };
}

function createLocation () {
  return {
    lat: getRandomNumber(MIN_LAT, MAX_LAT, LOCATION_DIGITS),
    lng: getRandomNumber(MIN_LNG, MAX_LNG, LOCATION_DIGITS)
  };
}

function createAdvertisement () {
  const location = createLocation();

  return {
    autor: createAuthor(),
    offer: createOffer(location),
    location
  };
}

function getAdvertisements(count) {
  return Array.from({length: count}, createAdvertisement);
}

getAdvertisements(ADVERTISEMENTS_COUNT);

import {getRandomInteger, getRandomNumber, getRandomArrayElement, getShuffledUniqueElements} from './util.js';

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

function getAvatarSrc () {
  const pictureNumber = String(getRandomInteger(1, AVATAR_COUNT)).padStart(2, '0');
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
    author: createAuthor(),
    offer: createOffer(location),
    location
  };
}

function getAdvertisements() {
  return Array.from({length: ADVERTISEMENTS_COUNT}, createAdvertisement);
}

export{getAdvertisements};

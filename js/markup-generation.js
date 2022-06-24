import {getAdvertisements} from './data.js';

const HOUSING_TYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};

function addElementContent(adCard, selector, content, method) {
  const element = adCard.querySelector(selector);
  if (!content) {
    element.classList.add('hidden');
    return;
  }

  switch (method) {
    case 'textContent':
      element.textContent = content;
      break;

    case 'innerHTML':
      element.innerHTML = content;
      break;

    case 'src':
      element.src = content;
      break;
  }
}

// Формирование набора из фотографий в карточке объявления
function setImagesList (adCard, images) {
  const imagesContainer = adCard.querySelector('.popup__photos');

  if (images.length === 0) {
    imagesContainer.classList.add('hidden');
  } else {
    const imageTemplateItem = adCard.querySelector('.popup__photo');
    const imagesFragment = document.createDocumentFragment();

    images.forEach((imageSrc) => {
      const imageItem = imageTemplateItem.cloneNode(true);
      imageItem.src = imageSrc;
      imagesFragment.append(imageItem);
    });

    imageTemplateItem.remove();
    imagesContainer.append(imagesFragment);
  }
}

// Удаление ненужных удобств из карточки
function removeUnnecessaryFeatures (adCard, features) {
  const featuresContainer = adCard.querySelector('.popup__features');

  if (features.length === 0) {
    featuresContainer.classList.add('hidden');
  } else {
    const featuresItems = adCard.querySelectorAll('.popup__feature');
    featuresItems.forEach((featureItem) => {
      const isNecessary = features.some(
        (featureName) => featureItem.classList.contains(`popup__feature--${featureName}`)
      );

      if (!isNecessary) {
        featureItem.remove();
      }
    });
  }
}

// Формирование одной карточки объявления
function createAdCard ({author, offer}, template) {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos
  } = offer;
  const {avatar} = author;
  const cardElement = template.cloneNode(true);

  addElementContent(cardElement, '.popup__title', title, 'textContent');
  addElementContent(cardElement, '.popup__text--address', address, 'textContent');
  addElementContent(cardElement, '.popup__text--price', `${String(price)} <span>₽/ночь</span>`, 'innerHTML');
  addElementContent(cardElement, '.popup__type', HOUSING_TYPE[type], 'textContent');
  addElementContent(cardElement, '.popup__text--capacity', `${rooms} комнаты для ${guests} гостей`, 'textContent');
  addElementContent(cardElement, '.popup__text--time', `Заезд после ${checkin}, выезд до ${checkout}`, 'textContent');
  addElementContent(cardElement, '.popup__description', description, 'textContent');
  addElementContent(cardElement, '.popup__avatar', avatar, 'src');
  removeUnnecessaryFeatures(cardElement, features);
  setImagesList(cardElement, photos);

  return cardElement;
}

// Формирование фрагмента с группой карт по заданному списку объявлений
function createAdsGroup (adsItems, template) {
  const adsGroupFragment = document.createDocumentFragment();

  adsItems.forEach((advertisement) => {
    const cardElement = createAdCard(advertisement, template);
    adsGroupFragment.append(cardElement);
  });

  return adsGroupFragment;
}


const mapContainer = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const adsList = getAdvertisements();
const adsGroup = createAdsGroup(adsList, cardTemplate);

mapContainer.append(adsGroup.children[0]);

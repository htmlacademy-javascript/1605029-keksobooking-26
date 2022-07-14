const FILTER_DEFAULT_VALUE = 'any';
const MAX_ADS_COUNT = 10;
const priceFilterValues = {
  low: {
    min: 0,
    max: 9999
  },
  middle: {
    min: 10000,
    max: 49999
  },
  high: {
    min: 50000,
    max: 100000
  }
};

const filtersFormElement = document.querySelector('.map__filters');


// По изменению формы фильтров перезабускаем сбор данных
// и перерисовку маркеров
function setFiltersFormChange (cb) {
  filtersFormElement.addEventListener('change', () => {
    cb();
  });
}

function setFiltersFormReset (cb) {
  filtersFormElement.addEventListener('reset', () => {
    cb();
  });
}


function isMatchesByType (adItem, filterTypeValue) {
  return filterTypeValue === FILTER_DEFAULT_VALUE || adItem.offer.type === filterTypeValue;
}


function isMatchesByPrice (adItem, filterPriceValue) {
  return filterPriceValue === FILTER_DEFAULT_VALUE
    || adItem.offer.price >= priceFilterValues[filterPriceValue].min
    && adItem.offer.price <= priceFilterValues[filterPriceValue].max;
}


function isMatchesByRooms (adItem, filterRoomsValue) {
  return filterRoomsValue === FILTER_DEFAULT_VALUE || adItem.offer.rooms === +filterRoomsValue;
}


function isMatchesByGuests (adItem, filterGuestsValue) {
  return filterGuestsValue === FILTER_DEFAULT_VALUE || adItem.offer.guests === +filterGuestsValue;
}


function isMatchesByFeatures (adItem, filterFeaturesValues) {
  const adFeatures = adItem.offer.features;

  return filterFeaturesValues.length === 0
    || adFeatures
    && filterFeaturesValues.every(
      (filterFeatureValue) => adFeatures.includes(filterFeatureValue)
    );
}


function filterAds (adsItems) {
  const filterTypeValue =
    filtersFormElement.querySelector('#housing-type').value;
  const filterPriceValue =
    filtersFormElement.querySelector('#housing-price').value;
  const filterRoomsValue =
    filtersFormElement.querySelector('#housing-rooms').value;
  const filterGuestsValue =
    filtersFormElement.querySelector('#housing-guests').value;
  const featuresElements =
    filtersFormElement.querySelectorAll('input[name="features"]');

  const filterFeaturesValues = [];
  featuresElements.forEach((featuresElement) => {
    if (featuresElement.checked) {
      filterFeaturesValues.push(featuresElement.value);
    }
  });

  const filteredAdsItems = [];

  for (let i = 0; i < adsItems.length; i++) {
    if (isMatchesByType(adsItems[i], filterTypeValue)
      && isMatchesByPrice(adsItems[i], filterPriceValue)
      && isMatchesByRooms(adsItems[i], filterRoomsValue)
      && isMatchesByGuests(adsItems[i], filterGuestsValue)
      && isMatchesByFeatures(adsItems[i], filterFeaturesValues)
    ) {
      if (filteredAdsItems.length >= MAX_ADS_COUNT) {
        break;
      }
      filteredAdsItems.push(adsItems[i]);
    }
  }

  return filteredAdsItems;
}


export {
  filterAds,
  setFiltersFormChange,
  setFiltersFormReset
};

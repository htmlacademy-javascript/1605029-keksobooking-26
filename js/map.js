import {
  enableForm,
  enableFilters,
  disableForm,
  disableFilters
} from './form-activation.js';
import {createAdsGroup} from './markup-generation.js';

const SIMILAR_ADS_COUNT = 10;
const DEFAULT_LAT = 35.68949;
const DEFAULT_LNG = 139.69171;
const SCALE = 10;


disableForm();
disableFilters();

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


const map = L.map('map-canvas')
  .on('load', () => {
    const addressElement = document.querySelector('#address');
    addressElement.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;

    enableForm();
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  }, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  },
  {
    draggable: true,
    icon: mainIcon
  }
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const addressElement = document.querySelector('#address');
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});


const markerGroup = L.layerGroup().addTo(map);


function resetCoordinates () {
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  });

  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  }, SCALE);
}


function createMarker ({lat, lng}, adCard) {
  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      icon
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(adCard);
}


function renderPins (adsData) {
  const adsGroup = createAdsGroup(adsData);
  adsData.slice(0, SIMILAR_ADS_COUNT)
    .forEach((adItem, index) => {
      createMarker(adItem.location, adsGroup[index]);
    });

  if (adsData.length) {
    enableFilters();
  }
}


export {
  resetCoordinates,
  createMarker,
  renderPins,
  DEFAULT_LAT,
  DEFAULT_LNG
};

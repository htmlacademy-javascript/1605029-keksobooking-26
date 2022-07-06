import {
  enableForm,
  enableFilters,
  disableForm,
  disableFilters
} from './form-activation.js';

const tokyoСoordinates = {
  lat: 35.68949,
  lng: 139.69171
};

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
    addressElement.value = `${tokyoСoordinates.lat}, ${tokyoСoordinates.lng}`;

    enableFilters();
    enableForm();
  })
  .setView({
    lat: tokyoСoordinates.lat,
    lng: tokyoСoordinates.lng
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainMarker = L.marker(
  {
    lat: tokyoСoordinates.lat,
    lng: tokyoСoordinates.lng
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
    lat: tokyoСoordinates.lat,
    lng: tokyoСoordinates.lng
  });

  map.setView({
    lat: tokyoСoordinates.lat,
    lng: tokyoСoordinates.lng
  }, 10);
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


export {
  resetCoordinates,
  createMarker
};

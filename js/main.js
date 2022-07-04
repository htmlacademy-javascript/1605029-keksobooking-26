import {getAdvertisements} from './data.js';
import {createAdsGroup} from './markup-generation.js';
import './form-slider.js';
import './form-validation.js';
import {setFormValidation} from './form-validation.js';
import './map.js';
import {createMarker} from './map.js';

setFormValidation();

const adsData = getAdvertisements();
const adsGroup = createAdsGroup(adsData);

adsData.forEach((adItem, index) => {
  createMarker(adItem.location, adsGroup[index]);
});

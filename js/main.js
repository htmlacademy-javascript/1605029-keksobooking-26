import './form-slider.js';
import './picture-upload.js';
import './form-validation.js';
import './map.js';
import {openSuccessModal, openErrorModal} from './form-modal.js';
import {setFormValidation, setUserFormSubmit} from './form-validation.js';
import {renderPins} from './map.js';
import {setFiltersFormChange, setFiltersFormReset, filterAds} from './filters.js';
import {getData} from './api.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;


setFormValidation();
setUserFormSubmit(openSuccessModal, openErrorModal);
getData((adsData) => {
  renderPins(adsData);
  setFiltersFormReset(() => renderPins(adsData));
  setFiltersFormChange(debounce(
    () => renderPins(filterAds(adsData)),
    RERENDER_DELAY
  ));
});


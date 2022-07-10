import './form-slider.js';
import './form-validation.js';
import './map.js';
import {
  openSuccessModal,
  openErrorModal
} from './form-modal.js';
import {
  setFormValidation,
  setUserFormSubmit
} from './form-validation.js';
import {renderPins} from './map.js';
import {getData} from './api.js';


setFormValidation();
setUserFormSubmit(openSuccessModal, openErrorModal);
getData(renderPins);

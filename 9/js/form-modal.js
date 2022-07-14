import {isEscapeKey} from './util.js';

let modalTemplate;
let modalElement;


function onPopupEscDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormModal();
  }
}


function onPopupDocumentClick() {
  closeFormModal();
}


function openFormModal (isSuccess) {
  return () => {
    modalTemplate = isSuccess
      ? document.querySelector('#success').content.querySelector('.success')
      : document.querySelector('#error').content.querySelector('.error');

    modalElement = modalTemplate.cloneNode(true);
    document.querySelector('body').append(modalElement);

    document.addEventListener('keydown', onPopupEscDown);
    document.addEventListener('click', onPopupDocumentClick);
  };
}


function closeFormModal () {
  modalElement.remove();

  document.removeEventListener('keydown', onPopupEscDown);
  document.removeEventListener('click', onPopupDocumentClick);
}


const openSuccessModal = openFormModal(true);
const openErrorModal = openFormModal(false);


export {openSuccessModal, openErrorModal};

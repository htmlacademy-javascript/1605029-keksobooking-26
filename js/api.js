const URL_GET_DATA = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://26.javascript.pages.academy/keksobooking';

function getData (onSuccess, onFail) {
  fetch (URL_GET_DATA)
    .then((response) => response.json())
    .then((adsData) => {
      onSuccess(adsData);
    })
    .catch(() => onFail('Не удалось загрузить объявления. Попробуйте перезагрузить страницу.'));
}


function sendData (onSuccess, onFail, body) {
  fetch(
    URL_SEND_DATA,
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
}


export {getData, sendData};

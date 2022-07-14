function getData (onSuccess, onFail) {
  fetch ('https://26.javascript.pages.academ/keksobooking/data')
    .then((response) => response.json())
    .then((adsData) => {
      onSuccess(adsData);
    })
    .catch(() => onFail('Не удалось загрузить объявления. Попробуйте перезагрузить страницу.'));
}


function sendData (onSuccess, onFail, body) {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
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

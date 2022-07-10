function getData (onSuccess) {
  fetch ('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adsData) => {
      onSuccess(adsData);
    });
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

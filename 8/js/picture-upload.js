const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChoiseSelectorsItems =
[
  {
    fileChoiseSelector: '#avatar',
    previewSelector: '.ad-form-header__preview img'
  },
  {
    fileChoiseSelector: '#images',
    previewSelector: '.ad-form__photo'
  }
];

fileChoiseSelectorsItems.forEach(({fileChoiseSelector, previewSelector}) => {
  const fileChoiceElement = document.querySelector(fileChoiseSelector);
  const previewElement = document.querySelector(previewSelector);

  fileChoiceElement.addEventListener('change', () => {
    const file = fileChoiceElement.files[0];
    const fileName = file.name.toLowerCase();

    const typeMatches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (typeMatches && previewElement.tagName.toLowerCase() === 'img') {
      previewElement.src = URL.createObjectURL(file);
    } else {
      previewElement.style.backgroundImage = `url("${URL.createObjectURL(file)}")`;
      previewElement.style.backgroundRepeat = 'no-repeat';
      previewElement.style.backgroundPosition = '50% 50%';
      previewElement.style.backgroundSize= '100%';
    }
  });
});

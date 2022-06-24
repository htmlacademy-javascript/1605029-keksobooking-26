// Управление активностью формы по классу
function manageFormDisablingByClass (formClass, disablingValue) {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.children;

  if (disablingValue === 'disabled') {
    form.classList.add(`${formClass}--disabled`);
    for (const fieldset of formElements) {
      fieldset.setAttribute('disabled', 'disabled');
    }
  } else {
    form.classList.remove(`${formClass}--disabled`);
    for (const fieldset of formElements) {
      fieldset.removeAttribute('disabled', 'disabled');
    }
  }
}

manageFormDisablingByClass('ad-form', 'disabled');
manageFormDisablingByClass('map__filters', 'disabled');

manageFormDisablingByClass('map__filters', 'enabled');

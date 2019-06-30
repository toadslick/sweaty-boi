export default (containerSelector, callback) => {
  const allRadiosSelector = `${containerSelector} input`;
  const checkedRadioSelector = `${allRadiosSelector}:checked`;
  const allRadios = document.querySelectorAll(allRadiosSelector);

  const selectedRadioChanged = () => {
    const checkedRadio = document.querySelector(checkedRadioSelector);
    callback(checkedRadio.value);
  };

  allRadios.forEach(radio =>
    radio.addEventListener("change", selectedRadioChanged)
  );

  const setSelectedRadio = value => {
    allRadios.forEach(radio => {
      radio.checked = radio.value === value;
    });
  };

  return setSelectedRadio;
};

const onRadioSelected = (containerSelector, callback) => {
  const allRadiosSelector = `${containerSelector} input`;
  const checkedRadioSelector = `${allRadiosSelector}:checked`;
  console.log(allRadiosSelector);
  console.log(checkedRadioSelector);
  const allRadios = document.querySelectorAll(allRadiosSelector);

  const selectedRadioChanged = () => {
    const checkedRadio = document.querySelector(checkedRadioSelector);
    callback(checkedRadio.value);
  };

  allRadios.forEach(radio =>
    radio.addEventListener("change", selectedRadioChanged)
  );
};

export { onRadioSelected };

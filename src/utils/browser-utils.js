const STORAGE_KEY = "mode";

const {
  storage: {
    onChanged: { addListener },
    local: { get, set }
  }
} = browser;

const getMode = (onSuccess, onError = () => {}) =>
  get(STORAGE_KEY).then(result => {
    onSuccess(result[STORAGE_KEY] || "off");
  }, onError);

const setMode = newValue =>
  getMode(oldValue => {
    if (newValue !== oldValue) {
      set({ [STORAGE_KEY]: newValue });
    }
  });

const onModeChanged = callback =>
  addListener(changes => {
    const change = changes[STORAGE_KEY];
    if (change) {
      callback(change.newValue);
    }
  });

export { getMode, setMode, onModeChanged };

const STORAGE_KEY = "mode";

const {
  storage: {
    addEventListener,
    local: { get, set }
  }
} = browser;

const setMode = value => set({ [STORAGE_KEY]: value });

const getMode = (onSuccess, onError = () => {}) =>
  get(STORAGE_KEY).then(result => {
    onSuccess(result[STORAGE_KEY]);
  }, onError);

const onModeChanged = callback =>
  addEventListener(changes => {
    const change = changes[STORAGE_KEY];
    if (change) {
      callback(change.newValue);
    }
  });

export { getMode, setMode, onModeChanged };

const STORAGE_KEY = "mode";

const {
  storage: {
    onChanged: { addListener },
    local: { get, set }
  }
} = chrome;

const getMode = onSuccess =>
  get(STORAGE_KEY, result => onSuccess(result[STORAGE_KEY] || "off"));

const setMode = newValue =>
  getMode(oldValue => {
    if (newValue !== oldValue) {
      console.log("SET MODE", newValue);
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

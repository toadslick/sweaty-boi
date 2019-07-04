const STORAGE_KEY = "mode";

const {
  storage: { onChanged, local }
} = chrome;

const getMode = onSuccess =>
  local.get(STORAGE_KEY, result => onSuccess(result[STORAGE_KEY] || "off"));

const setMode = newValue =>
  getMode(oldValue => {
    if (newValue !== oldValue) {
      local.set({ [STORAGE_KEY]: newValue });
    }
  });

const onModeChanged = callback =>
  onChanged.addListener(changes => {
    const change = changes[STORAGE_KEY];
    if (change) {
      callback(change.newValue);
    }
  });

export { getMode, setMode, onModeChanged };

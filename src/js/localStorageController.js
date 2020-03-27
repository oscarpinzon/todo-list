const getLocalStorageData = () => {
  const key = "TODO";
  return localStorage.getItem("TODO");
};

const setLocalStorageData = LIST => {
  const key = "TODO";
  localStorage.setItem(key, JSON.stringify(LIST));
};

export { getLocalStorageData, setLocalStorageData };

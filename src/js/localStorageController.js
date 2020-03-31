const getLocalStorageData = () => {
  const key = "TODO";
  return localStorage.getItem("TODO");
};

const saveLocalStorageData = LIST => {
  const key = "TODO";
  localStorage.setItem(key, JSON.stringify(LIST));
};

export { getLocalStorageData, saveLocalStorageData };

export const getLocalStorage = () => JSON.parse(localStorage.getItem('ranking'));

export const setLocalStorage = (newScore) => {
  const oldStorage = JSON.parse(localStorage.getItem('ranking'));
  if (!oldStorage) return localStorage.setItem('ranking', JSON.stringify([newScore]));
  return localStorage.setItem('ranking', JSON.stringify([...oldStorage, newScore]));
};

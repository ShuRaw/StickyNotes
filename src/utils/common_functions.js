export const getRandomNumber = (max, min) => {
  return Math.random() * (max - min) + min;
}

export const updateLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}


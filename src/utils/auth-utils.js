const USER_LOCAL_STORAGE_KEY = "user"

export const saveLoggedInUserFromLocalStorage = (userData) => {
  saveToLocalStorage(USER_LOCAL_STORAGE_KEY, userData)
}

export const removeLoggedInUserFromLocalStorage = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

export const getUserLoggedInStatus = () => {
  if (readFromLocalStorage(USER_LOCAL_STORAGE_KEY) === null) {
    return "Not logged in"
  } else {
    return "Logged in";
  }
}

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, data);
};

const readFromLocalStorage = (key) => {
  return localStorage.getItem(key);
}
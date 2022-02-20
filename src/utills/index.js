export * from './constants'; //means import all and then export all

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('cannot store in LS');
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('cannot get key from LS');
  }

  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('cannot remove from LS');
  }

  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); //satyamraj387  123 => satyamraj387%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); //'username=satyamraj387&password=123'
};

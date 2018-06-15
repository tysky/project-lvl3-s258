import isURL from 'validator/lib/isURL';
import { getURLs } from './state';

const checkDouble = (url, state) => getURLs(state).includes(url);

const isValidInput = (inputUrl, state) => {
  if (inputUrl.length === 0) {
    return true;
  }
  if (checkDouble(inputUrl, state)) {
    return false;
  }
  if (!isURL(inputUrl)) {
    return false;
  }
  return true;
};

export const checkInput = (event, state) => {
  const inputEL = event.target;
  if (isValidInput(inputEL.value, state)) {
    inputEL.classList.remove('is-invalid');
  } else {
    inputEL.classList.add('is-invalid');
  }
};


export const fillFeedItems = items => [...items].map((item) => {
  const attributes = ['title', 'description', 'link', 'guid'];
  const itemAttrs = attributes.reduce((acc, value) => {
    const attr = { [value]: item.querySelector(`${value}`).textContent };
    return { ...acc, ...attr };
  }, {});
  return itemAttrs;
});


import isURL from 'validator/lib/isURL';
import { getURLs } from './state';

const checkDouble = (url, state) => getURLs(state).includes(url);

export const isValidInput = (inputUrl, state) => {
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


export const fillFeedItems = items => [...items].map((item) => {
  const attributes = ['title', 'description', 'link', 'guid'];
  const itemAttrs = attributes.reduce((acc, value) => {
    const attr = { [value]: item.querySelector(`${value}`).textContent };
    return { ...acc, ...attr };
  }, {});
  return itemAttrs;
});


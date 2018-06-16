import isURL from 'validator/lib/isURL';
import { getURLs, setStateValid } from './state';

const checkDouble = (url, state) => getURLs(state).includes(url);

export const isValidInput = (inputUrl, state) => {
  if (inputUrl.length === 0) {
    setStateValid(state, true);
  } else if (checkDouble(inputUrl, state)) {
    setStateValid(state, false);
  } else if (!isURL(inputUrl)) {
    setStateValid(state, false);
  } else {
    setStateValid(state, true);
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


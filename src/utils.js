import isURL from 'validator/lib/isURL';
import { getURLs } from './state';

const checkDouble = (url, state) => getURLs(state).includes(url);

const isValidInput = (event, state) => {
  if (event.target.value.length === 0) {
    return true;
  }
  if (checkDouble(event.target.value, state)) {
    return false;
  }
  if (!isURL(event.target.value)) {
    return false;
  }
  return true;
};

export const checkInput = (event, state) => {
  const inputEL = event.target;
  if (isValidInput(event, state)) {
    inputEL.classList.remove('is-invalid');
  } else {
    inputEL.classList.add('is-invalid');
  }
};


export const fillFeedItems = items => [...items].map(item =>
  ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
  }));


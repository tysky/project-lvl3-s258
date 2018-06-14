import isURL from 'validator/lib/isURL';
import { getURLs } from './state';

const checkDouble = url => getURLs().includes(url);

export const checkInput = (event) => {
  const inputEL = event.target;
  if (checkDouble(event.target.value)) {
    inputEL.classList.add('is-invalid');
    return;
  }
  if (!isURL(event.target.value)) {
    inputEL.classList.add('is-invalid');
  } else {
    inputEL.classList.remove('is-invalid');
  }
};

export const fillFeedItems = items => [...items].map(item =>
  ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
  }));


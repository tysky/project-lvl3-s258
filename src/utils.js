import isURL from 'validator/lib/isURL';
import { getURLs } from './state';

const checkDouble = (url, state) => getURLs(state).includes(url);

// is valid input?
export default (inputUrl, state) => {
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

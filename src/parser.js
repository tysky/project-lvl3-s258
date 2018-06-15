import axios from 'axios';
import { renderErrorMsg } from './views';
import { fillFeedItems } from './utils';
import { addNewFeed } from './state';

const disableForm = (formEl) => {
  const inputEl = formEl.querySelector('input');
  const buttonEl = formEl.querySelector('button');
  inputEl.removeAttribute('disabled');
  buttonEl.removeAttribute('disabled');
};


const parseRSS = url => axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
  .then(res => res.data)
  .then((data) => {
    const parser = new DOMParser();
    const rssDoc = parser.parseFromString(data, 'application/xml');
    if (rssDoc.children[0].matches('parsererror')) {
      return Promise.reject(new Error('Error while parsing XML document'));
    }
    return rssDoc;
  });

const loadRSSFeed = (url, state, formEl) => {
  parseRSS(url)
    .then((rssDoc) => {
      const title = rssDoc.querySelector('title').textContent;
      const desc = rssDoc.querySelector('description').textContent;
      const items = rssDoc.querySelectorAll('item');
      const feed = {
        url,
        title,
        desc,
        items: fillFeedItems(items),
      };
      addNewFeed(feed, state);
      return feed;
    })
    .then(() => {
      disableForm(formEl);
      const inputEl = formEl.querySelector('input');
      inputEl.value = '';
    })
    .catch((err) => {
      disableForm(formEl);
      renderErrorMsg(`${err.message}. Try again.`);
    });
};

export default (event, state) => {
  event.preventDefault();
  const formEl = event.target;
  const inputEl = formEl.querySelector('input');
  if (inputEl.classList.contains('is-invalid')) {
    alert('Invalid URL!. Try again'); // eslint-disable-line no-alert
    return;
  }
  inputEl.setAttribute('disabled', '');
  const buttonEl = formEl.querySelector('button');
  buttonEl.setAttribute('disabled', '');
  const rssURL = inputEl.value;
  loadRSSFeed(rssURL, state, formEl);
};

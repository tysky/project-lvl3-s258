import axios from 'axios';

import { addNewFeed } from './state';
import { renderChannels, renderArticles, renderErrorMsg } from './views';
import { checkInput, fillFeedItems } from './utils';


const loadRSSFeed = (url, state) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
    .then(res => res.data)
    .then((data) => {
      const parser = new DOMParser();
      const rssDoc = parser.parseFromString(data, 'application/xml');
      if (rssDoc.children[0].matches('parsererror')) {
        return Promise.reject(new Error('Error while parsing XML document'));
      }
      return rssDoc;
    })
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
    .then((feed) => {
      renderChannels(feed);
      feed.items.forEach(item => renderArticles(item));
    })
    .catch((err) => {
      renderErrorMsg(`${err.message}. Try again.`);
    });
};

const addRSSFeed = (event, state) => {
  event.preventDefault();
  const form = event.target;
  const inputEl = form.querySelector('input');
  if (inputEl.classList.contains('is-invalid')) {
    alert('Invalid URL!. Try again'); // eslint-disable-line no-alert
    return;
  }
  const rssURL = inputEl.value;
  inputEl.value = '';
  loadRSSFeed(rssURL, state);
};

export default (state) => {
  const inputEl = document.getElementById('rssLinkInput');
  inputEl.addEventListener('input', e => checkInput(e, state));
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', e => addRSSFeed(e, state));
};

import { checkInput, handleFormBeforeLoading, handleFormSuccessRes, handleFormFailRes, renderErrorMsg } from './views';
import loadRSSFeed, { parseRSS } from './parser';
import { addNewArticles } from './state';
import { fillFeedItems } from './utils';


const updateRSSFeed = (url, state) => {
  parseRSS(url)
    .then((rssDoc) => {
      const items = fillFeedItems(rssDoc.querySelectorAll('item'));
      addNewArticles(url, items, state);
      window.setTimeout(() => updateRSSFeed(url, state), 5000);
    })
    .catch((err) => {
      renderErrorMsg(`${err.message}. Try again.`);
    });
};

const addRSSFeed = (event, state) => {
  event.preventDefault();
  const formEl = event.target;
  handleFormBeforeLoading(formEl);
  const rssURL = formEl.querySelector('input').value;
  loadRSSFeed(rssURL, state, formEl)
    .then(() => {
      handleFormSuccessRes(formEl);
      window.setTimeout(() => updateRSSFeed(rssURL, state), 5000);
    })
    .catch((err) => {
      handleFormFailRes(formEl, err);
    });
};

export default (state) => {
  const inputEl = document.getElementById('rssLinkInput');
  inputEl.addEventListener('input', e => checkInput(e, state));
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', e => addRSSFeed(e, state));
};

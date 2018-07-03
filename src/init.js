import { checkInput, handleFormBeforeLoading, handleFormSuccessRes, handleFormFailRes, handleExampleLink, renderErrorMsg } from './views';
import loadRSSFeed, { updateRSSFeed } from './parser';


const updateFeed = (url, state) => {
  updateRSSFeed(url, state)
    .then(() => {
      setTimeout(() => updateFeed(url, state), 5000);
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
      setTimeout(() => updateFeed(rssURL, state), 5000);
    })
    .catch((err) => {
      handleFormFailRes(formEl, err);
    });
};

export default (state) => {
  const exampleLinks = document.querySelectorAll('.exampleURL');
  exampleLinks.forEach(link => link.addEventListener('click', e => handleExampleLink(e)));
  const inputEl = document.getElementById('rssLinkInput');
  inputEl.addEventListener('input', e => checkInput(e, state));
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', e => addRSSFeed(e, state));
};

import { checkInput, enableForm, renderErrorMsg } from './views';
import loadRSSFeed from './parser';


const addRSSFeed = (event, state) => {
  event.preventDefault();
  const formEl = event.target;
  const inputEl = formEl.querySelector('input');
  inputEl.setAttribute('disabled', '');
  const buttonEl = formEl.querySelector('button');
  buttonEl.setAttribute('disabled', '');
  const rssURL = inputEl.value;
  loadRSSFeed(rssURL, state, formEl)
    .then(() => {
      enableForm(formEl);
      inputEl.value = '';
    })
    .catch((err) => {
      enableForm(formEl);
      renderErrorMsg(`${err.message}. Try again.`);
    });
};

export default (state) => {
  const inputEl = document.getElementById('rssLinkInput');
  inputEl.addEventListener('input', e => checkInput(e, state));
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', e => addRSSFeed(e, state));
};

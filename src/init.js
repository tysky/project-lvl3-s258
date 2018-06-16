import { checkInput, disableForm, renderErrorMsg } from './views';
import loadRSSFeed from './parser';


const addRSSFeed = (event, state) => {
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
  loadRSSFeed(rssURL, state, formEl)
    .then(() => {
      disableForm(formEl);
      inputEl.value = '';
    })
    .catch((err) => {
      disableForm(formEl);
      renderErrorMsg(`${err.message}. Try again.`);
    });
};

export default (state) => {
  const inputEl = document.getElementById('rssLinkInput');
  inputEl.addEventListener('input', e => checkInput(e, state));
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', e => addRSSFeed(e, state));
};

import { checkInput, handleFormBeforeLoading, handleFormSuccessRes, handleFormFailRes } from './views';
import loadRSSFeed from './parser';


const addRSSFeed = (event, state) => {
  event.preventDefault();
  const formEl = event.target;
  handleFormBeforeLoading(formEl);
  const rssURL = formEl.querySelector('input').value;
  loadRSSFeed(rssURL, state, formEl)
    .then(() => {
      handleFormSuccessRes(formEl);
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

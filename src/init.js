import { checkInput } from './utils';
import { addRSSFeed } from './parser';


export default (state) => {
  const inputEl = document.getElementById('rssLinkInput');
  inputEl.addEventListener('input', e => checkInput(e, state));
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', e => addRSSFeed(e, state));
};

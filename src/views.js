import $ from 'jquery';

import { getArticleByGuid, setStateValid } from './state';
import isValidInput from './utils';

const renderChannels = (feed) => {
  const channelsList = document.querySelector('.channels-list');
  const liEl = document.createElement('li');
  const { title, desc } = feed;
  const textNode = document.createTextNode(`${title} - ${desc}`);
  liEl.append(textNode);
  liEl.setAttribute('class', 'list-group-item');
  channelsList.append(liEl);
};

const renderArticles = ({ title, link, guid }) => {
  const articlesList = document.querySelector('.articles-list');
  const liEl = `<li class="list-group-item d-flex flex-column align-items-start">
  <a class="list-group-item-action" href="${link}" target="_blank">${title}</a>
  <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCenter" data-guid="${guid}">Show</button>
  </li>`;
  articlesList.innerHTML += liEl;
};

const modalHandling = (state) => {
  $('#modalCenter').on('show.bs.modal', (event) => {
    const button = $(event.relatedTarget);
    const articleGuid = String(button.data('guid'));
    const modal = $(event.currentTarget);
    const { title, description, link } = getArticleByGuid(articleGuid, state);
    modal.find('.modal-title').text(title);
    modal.find('.modal-body').text(description);
    modal.find('.modal-link').attr('href', link);
  });
};

export const render = (state) => {
  document.querySelector('.channels-list').innerHTML = '';
  document.querySelector('.articles-list').innerHTML = '';
  state.rssFeeds.forEach((feed) => {
    renderChannels(feed);
    feed.items.forEach(item => renderArticles(item));
  });
  modalHandling(state);
};

export const renderErrorMsg = (msg) => {
  const alertBlock = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  ${msg}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
    </button>
    </div>`;
  document.querySelector('.error-field').innerHTML = alertBlock;
};

export const enableForm = (formEl) => {
  const inputEl = formEl.querySelector('input');
  const buttonEl = formEl.querySelector('button');
  inputEl.removeAttribute('disabled');
  buttonEl.removeAttribute('disabled');
};

export const checkInput = (event, state) => {
  const inputEL = event.target;
  setStateValid(state, isValidInput(inputEL.value, state));
  const buttonEl = document.querySelector('button[type=submit]');
  if (state.isValidUrl) {
    inputEL.classList.remove('is-invalid');
    buttonEl.removeAttribute('disabled');
  } else {
    inputEL.classList.add('is-invalid');
    buttonEl.setAttribute('disabled', '');
  }
};

export const handleFormSuccessRes = (formEl) => {
  enableForm(formEl);
  const inputEl = formEl.querySelector('input');
  inputEl.value = '';
};

export const handleFormFailRes = (formEl, err) => {
  enableForm(formEl);
  renderErrorMsg(`${err.message}. Try again.`);
};

export const handleFormBeforeLoading = (formEl) => {
  const inputEl = formEl.querySelector('input');
  inputEl.setAttribute('disabled', '');
  const buttonEl = formEl.querySelector('button');
  buttonEl.setAttribute('disabled', '');
};

export const handleExampleLink = (e) => {
  e.preventDefault();
  const inputEl = document.querySelector('input');
  inputEl.value = e.target.textContent;
};

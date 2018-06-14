
export const renderChannels = (feed) => {
  const channelsList = document.querySelector('.channels-list');
  const liEl = document.createElement('li');
  const { title, desc } = feed;
  const textNode = document.createTextNode(`${title} - ${desc}`);
  liEl.append(textNode);
  liEl.setAttribute('class', 'list-group-item');
  channelsList.append(liEl);
};

export const renderArticles = ({ title, link }) => {
  const articlesList = document.querySelector('.articles-list');
  const aEl = document.createElement('a');
  const linkTitle = document.createTextNode(title);
  aEl.append(linkTitle);
  aEl.setAttribute('href', link);
  aEl.setAttribute('class', 'list-group-item', 'list-group-item-action');
  aEl.setAttribute('target', '_blank');
  articlesList.append(aEl);
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


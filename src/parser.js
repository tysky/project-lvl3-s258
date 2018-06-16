import axios from 'axios';
import { fillFeedItems } from './utils';
import { addNewFeed } from './state';


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

export default (url, state) => parseRSS(url)
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
  });

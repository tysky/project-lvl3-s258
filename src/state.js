import _ from 'lodash';
import WatchJS from 'melanke-watchjs';

import { render } from './views';


// state scheme
//     [{
//       url: '',
//       title: '',
//       desc: '',
//       items: [{ title: '', description: '', link: '', guid: '' }],
//     }];

export const state = [];

const { watch } = WatchJS;
watch(state, () => {
  render(state);
});

export const getURLs = stateData => stateData.reduce((acc, value) => [...acc, value.url], []);

export const addNewFeed = (feed, stateData) => stateData.push(feed);

export const getArticleByGuid = (guid, stateData) =>
  _.find(_.flatten(stateData.map(feed => feed.items)), o => o.guid === guid);

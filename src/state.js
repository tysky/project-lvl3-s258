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

export const getState = () => {
  const state = [];

  const { watch } = WatchJS;
  watch(state, () => {
    render(state);
  });

  return state;
};


export const getURLs = state => state.reduce((acc, value) => [...acc, value.url], []);

export const addNewFeed = (feed, state) => state.push(feed);

export const getArticleByGuid = (guid, state) =>
  _.find(_.flatten(state.map(feed => feed.items)), o => o.guid === guid);

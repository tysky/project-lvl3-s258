import WatchJS from 'melanke-watchjs';
import { render } from './views';


// state scheme
//     [{
//       url: '',
//       title: '',
//       desc: '',
//       items: { title: '', link: '' },
//     }];

export const state = [];

const { watch } = WatchJS;
watch(state, () => {
  render(state);
});

export const getURLs = stateData => stateData.reduce((acc, value) => [...acc, value.url], []);

export const addNewFeed = (feed, stateData) => stateData.push(feed);

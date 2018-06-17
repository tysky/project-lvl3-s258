import _ from 'lodash';

// state scheme
// {
//     isValidUrl: false,
//     rssFeeds: [{
//       url: '',
//       title: '',
//       desc: '',
//       items: [{ title: '', description: '', link: '', guid: '' }, ],
//     }, ]
// }

export const getState = () => {
  const state = {
    isValidUrl: false,
    rssFeeds: [],
  };
  return state;
};


export const getURLs = state => state.rssFeeds.reduce((acc, value) => [...acc, value.url], []);

export const addNewFeed = (feed, state) => state.rssFeeds.push(feed);

export const addNewArticles = (feedUrl, newItems, state) => {
  const feed = _.find(state.rssFeeds, f => f.url === feedUrl);
  feed.items = _.unionWith(feed.items, newItems, _.isEqual);
};

export const getArticleByGuid = (guid, state) =>
  _.find(_.flatten(state.rssFeeds.map(feed => feed.items)), o => o.guid === guid);

export const setStateValid = (state, isValid) => {
  state.isValidUrl = isValid; // eslint-disable-line no-param-reassign
};

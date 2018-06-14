
// state scheme
//     [{
//       url: '',
//       title: '',
//       desc: '',
//       items: { title: '', link: '' },
//     }];

const state = [];

export const getURLs = () => state.reduce((acc, value) => [...acc, value.url], []);

export const addNewFeed = feed => state.push(feed);

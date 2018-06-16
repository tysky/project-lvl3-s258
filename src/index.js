import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WatchJS from 'melanke-watchjs';

import init from './init';
import { getState } from './state';
import { render } from './views';

const run = () => {
  const state = getState();

  const { watch } = WatchJS;
  watch(state, () => {
    render(state);
  });

  init(state);
};

run();

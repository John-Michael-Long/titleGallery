// client/src/js/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TitleSearch from './components/TitleSearch';
import TitleGallery from './components/TitleGallery';
import store from './redux/store';


ReactDOM.render(<TitleSearch />, document.getElementById('titleSearch'));

ReactDOM.render(
  <Provider store={store}>
    <TitleGallery />
  </Provider>,
  document.getElementById('titleGallery'),
);

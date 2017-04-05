import 'es5-shim';
import 'es6-shim';
import 'es6-promise';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './store/routes';
import configureStore from './store/configure-store';
import './styles/index.css';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);


const app = (
  <div>
    <Provider store={ store }>
      <Router history={ history }>
        { routes }
      </Router>
    </Provider>
  </div>
);

if (!__TEST__) {
  ReactDOM.render(app, document.getElementById('root'));
}

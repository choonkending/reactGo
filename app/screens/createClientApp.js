import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';

const createServerApp = routes => history => store => (
  <Router history={history}>
    <Provider store={store}>
      <App routes={routes}/>
    </Provider>
  </Router>
);

export default createServerApp;

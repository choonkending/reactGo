import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const createServerApp = routes => url => store => (
  <StaticRouter location={url} context={{}}>
    <Provider store={store}>
      <App routes={routes}/>
    </Provider>
  </StaticRouter>
);

export default createServerApp;


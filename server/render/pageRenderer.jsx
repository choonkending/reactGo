import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import staticAssets from './static-assets';

const createApp = (store, props) => (
  <Provider store={store}>
    <RouterContext {...props} />
  </Provider>
);

const buildPage = ({ componentHTML, initialState, headAssets, styleSheet }) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${styleSheet.getStyleTags()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript()}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${staticAssets.createAppScript()}
  </body>
</html>`;
};

export default (store, props) => {
  const initialState = store.getState();
  const styleSheet = new ServerStyleSheet();
  const componentHTML = renderToString(
    styleSheet.collectStyles(
      createApp(store, props)
    )
  );
  const headAssets = Helmet.renderStatic();
  return buildPage({ componentHTML, initialState, headAssets, styleSheet });
};


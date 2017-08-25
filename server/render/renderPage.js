import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import configureStore from '../../app/store/configureStore';
import createServerApp from '../../app/screens/createServerApp';
import routes from '../../app/routes';
import page from './templates/index.html';
import staticAssets from './static-assets';

/* FIX: initial state should ideally not be coupled to the shape of the reducer */
const createInitialState = data => ({ topic: { topics: data[0] }});

const appRoutes = routes[0].routes;
const createApp = createServerApp(appRoutes);

const createHydrationScript = initialState => (
  `<script>
    window.REACTGO = window.REACTGO || {};
    window.REACTGO.INITIAL_STATE = ${JSON.stringify(initialState)}
  </script>`
);

const renderPage = url => data => {
  const initialState = createInitialState(data);
  const store = configureStore(initialState);
  const markup = renderToString(createApp(url)(store));
  const { title, meta, link } =  Helmet.renderStatic();
  return page
    .replace('!TITLE!', title)
    .replace('!META!', meta)
    .replace('!LINK!', link)
    .replace('!MARKUP!', markup)
    .replace('!PAGE_DATA!', createHydrationScript(initialState))
    .replace('!HEAD_SCRIPTS!', staticAssets.createHeadScripts())
    .replace('!APP_STYLES!', staticAssets.createStyleSheets())
    .replace('!APP_SCRIPTS!', staticAssets.createAppScripts());
};

export default renderPage;


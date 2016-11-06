import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import { trackingID } from 'config/app';
import markup from 'index.html';

const createTrackingScript = trackingID =>
`<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', ${trackingID}, 'auto');
  ga('send', 'pageview');
  </script>`;

const analtyicsScript = createTrackingScript(trackingID);

const createApp = (store, props) => renderToString(
  <Provider store={store}>
    <RouterContext {...props} />
  </Provider>
);

const buildPage = (componentHTML, initialState, analtyicsScript) => {
  return markup
    .replace('!!COMPONENT_HTML!!', componentHTML)
    .replace('!!INITIAL_STATE!!', JSON.stringify(initialState));
};

export default (store, props) => {
  const initialState = store.getState();
  const componentHTML = createApp(store, props);
  return buildPage(componentHTML, initialState, analtyicsScript);
};


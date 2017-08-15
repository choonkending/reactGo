import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter, Route, Switch } from 'react-router-dom';
import routes from '../../app/routes';
import fetchDataForRoutes from '../../app/utils/fetchDataForRoutes';
import createRouteMatcherWithUrl from '../../app/utils/createRouteMatcherWithUrl';
import sendResponse from './sendResponse';
import renderPage from './renderPage';

const render = (req, res) => {
  const url = req.url;
  const matchedRoutes = createRouteMatcherWithUrl(url)
                          .match(routes);
  const promises = fetchDataForRoutes(matchedRoutes);

  Promise
    .all(promises)
    .then(renderPage(url))
    .then(sendResponse(res));

};

export default render;


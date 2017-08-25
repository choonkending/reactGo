import React from 'react';
import { render } from 'react-dom';
import createClientApp from './screens/createClientApp';
import configureStore from './store/configureStore';
import routes from './routes';
import createBrowserHistory from 'history/createBrowserHistory';

const AppRoutes = routes[0].routes;
const history = createBrowserHistory();
const unlisten = history.listen((location, action) => {
  console.log("location", location);
});

const getInitialState = () => window.REACTGO && window.REACTGO.INITIALSTATE;
const store = configureStore(getInitialState());

const App = createClientApp(AppRoutes)(history)(store);

render(App, document.getElementById('app'));


import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../containers/Navigation';
import Message from '../containers/Message';

const App = ({ routes }) => {
  const results = routes.map(
    ({ path, exact, strict, component: Component }, index) =>
    <Route
      key={index}
      path={path}
      exact={exact}
      strict={strict}
      render={
        props => <Component {...props} />
      }
    />
  );
  return (
    <div>
      <Navigation />
      <Message />
      { results }
    </div>
  )
};

App.propTypes = {
  routes: PropTypes.array.isRequired
};

export default App;


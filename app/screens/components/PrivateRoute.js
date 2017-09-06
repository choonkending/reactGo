import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authService } from '../../services';

const PrivateRoute = ({ component: Component, location, ...rest }) => (
  <Route location={location} {...rest}>
    {
      authService().isAuthenticated() ?
      <Component location={location} {...rest} /> : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }}/>
    }
  </Route>
);

export default PrivateRoute;


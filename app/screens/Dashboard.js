import React from 'react';
import PrivateRoute from './components/PrivateRoute';

const WassupMate = () => (<div>mate</div>);

const Dashboard = props => <PrivateRoute {...props} component={WassupMate} />;

export default Dashboard;


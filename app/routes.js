import { fetchVoteData, fetchDashboardData } from './fetch-data';
import { App, Vote, About, LoginOrRegister } from './pages';
import Dashboard from './screens/Dashboard';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Vote,
        fetchData: fetchVoteData
      },
      {
        path: '/login',
        component: LoginOrRegister
      },
      {
        path: '/dashboard',
        component: Dashboard,
        fetchData: fetchDashboardData
      },
      {
        path: '/about',
        component: About
      }
    ]
  }
];

export default routes;


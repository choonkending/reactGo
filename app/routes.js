import { fetchVoteData } from './fetch-data';
import { App, Vote, Dashboard, About, LoginOrRegister } from './pages';

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
        component: Dashboard
      },
      {
        path: '/about',
        component: About
      }
    ]
  }
];

export default routes;


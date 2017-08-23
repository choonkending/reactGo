import { matchPath } from 'react-router-dom';

const createRouteMatcherWithUrl = url => ({
  match: routes => {
    const matchRoute = routes => routes.reduce((acc, cur) => {
      const match = matchPath(url, cur);
      if (match) {
        acc.push({ route: cur, match });
        if (cur.routes && cur.routes.length > 0) {
          return acc.concat(matchRoute(cur.routes));
        }
      }
      return acc;
    }, []);

    return matchRoute(routes);
  }
});

export default createRouteMatcherWithUrl;


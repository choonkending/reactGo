const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ route, params }) {
  const fetchDataHandler = route.fetchData || defaultFetchData;
  return fetchDataHandler(params);
}

export default fetchDataForRoute;


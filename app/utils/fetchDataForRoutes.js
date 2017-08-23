const hasFetchData = data => data.route && data.route.fetchData;
const fetchData = data => data.route.fetchData(data.match);

const fetchDataForRoutes = routes => routes.filter(hasFetchData).map(fetchData);

export default fetchDataForRoutes;


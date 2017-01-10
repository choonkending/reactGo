const fetchHandlers = route => store => ({
  fetchSuccess: response => route.fetchSuccess && route.fetchSuccess({ store, response }),
  fetchError: error => route.fetchError && route.fetchError({ store, error })
});

export default fetchHandlers;


import { voteService } from '../services';
import { LOAD_TOPICS, RESET_TOPICS } from '../types';

const fetchData = () => voteService.getTopics();
const fetchSuccess = ({ store, response }) => store.dispatch({ type: LOAD_TOPICS, data: response.data });
const fetchError = ({ store, error }) => store.dispatch({ type: RESET_VOTES });

export default {
  fetchData,
  fetchSuccess,
  fetchError
};


import { profileService } from '../services';

const fetchData = () => profileService().getProfiles().then(data => {
  console.log("I have fetchoes", data);
  return data;
});

export default fetchData;


import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://api.openweathermap.org',
});

apiClient.defaults.params = {};
apiClient.defaults.params.appid = 'YOUR_API_KEY';

export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://api.openweathermap.org',
});

apiClient.defaults.params = {};
apiClient.defaults.params.appid = '439686b83e15b450921ef8541567a577';

export default apiClient;

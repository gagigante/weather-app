import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'api.openweathermap.org/data/2.5/weather',
});

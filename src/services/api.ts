import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.30.172.16:3369',
});

export default api;

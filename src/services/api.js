import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.123:3000', // Necessário trocar pelo ip local //
});

export default api;

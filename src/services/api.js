import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.100.5.110:3005/'
})

export default api;
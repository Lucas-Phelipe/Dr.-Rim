import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dr-rim-backend.fly.dev'
});


export const postUser = (body) => api.post('/users', body);

export const login = (body) => api.post('/users/login', body);
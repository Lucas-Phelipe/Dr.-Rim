import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dr-rim-backend.fly.dev',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createPost = (body) => api.post('/posts', body);
export const getPosts = () => api.get('/posts');

export const postUser = (body) => api.post('/users', body);
export const login = (body) => api.post('/users/login', body);

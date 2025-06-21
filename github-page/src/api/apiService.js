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

export const postMedication = (body, userId) => api.post(`/users/${userId}/medication`, body);
export async function getMedication(userId) {
  const response = await api.get(`/users/${userId}/medication`);
  return response.data;  // Só o data
}

//Scheduling 
export const postScheduling = (body, userId) => api.post(`/users/${userId}/scheduling`, body);
export const getScheduling = (userId) => api.post(`/users/${userId}/scheduling`);


export const deleteScheduling = (userId, schedulingId) =>api.delete();
export const deleteMedication = (userId, medicationId) =>api.delete();
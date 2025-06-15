import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Usuário
export const getUserByEmail = (email) => api.get(`/users/email/${email}`);
export const createUser = (body) => api.post("/users", body);
export const loginUser = (body) => api.post("/users/login", body);
export const addPostToUser = (userId, postId) =>
  api.put(`/users/${userId}/addPost`, { postId });

// Posts
export const getPosts = () => api.get("/posts");
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const createPost = (post) => api.post("/posts", post);

// Comentários
export const addCommentToPost = (postId, comment) =>
  api.post(`/posts/${postId}/comments`, comment);

export default api;
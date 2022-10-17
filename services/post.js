import axios from 'axios';

export const createPost = async (data) => {
  return await axios.post(`/posts`, data);
};

export const getPosts = async () => {
  return await axios.get(`/posts`);
};

export const getPost = async (_id) => {
  return await axios.get(`/posts/${_id}`);
};

export const updatePost = async (_id, data) => {
  return await axios.put(`/posts/${_id}`, data);
};

export const deletePost = async (_id) => {
  return await axios.delete(`/posts/${_id}`);
};

export const addLike = async (_id) => {
  return await axios.put(`/likes`, { _id });
};

export const removeLike = async (_id) => {
  return await axios.put(`/unlikes`, { _id });
};

export const addComment = async (_id, comment) => {
  return await axios.put(`/add-comment`, { _id, comment });
};

export const removeComment = async (_id, comment) => {
  return await axios.put(`/remove-comment`, { _id, comment });
};

export const uploadImage = async (data) => {
  return await axios.post(`/images`, data);
};

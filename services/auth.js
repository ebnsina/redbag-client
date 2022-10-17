import axios from 'axios';

export const register = async (data) => {
  return await axios.post(`/register`, data);
};

export const login = async (data) => {
  return await axios.post(`/login`, data);
};

export const resetPassword = async (data) => {
  return await axios.post(`/reset-password`, data);
};

export const currentUser = async () => {
  return await axios.get(`/me`);
};

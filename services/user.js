import axios from 'axios';

export const search = async (query) => {
  return await axios.get(`/search/${query}`);
};

export const findUsers = async () => {
  return await axios.get(`/users/find`);
};

export const getUser = async (username) => {
  return await axios.get(`/users/${username}`);
};

export const getFollowings = async () => {
  return await axios.get(`/users/following`);
};

export const updateUser = async (data) => {
  return await axios.put(`/users/update`, data);
};

export const updateUserFollower = async (_id) => {
  return await axios.put(`/users/follow`, { _id });
};

export const updateUserUnfollower = async (_id) => {
  return await axios.put(`/users/unfollow`, { _id });
};

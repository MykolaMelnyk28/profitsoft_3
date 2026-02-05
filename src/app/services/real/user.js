import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getUserProfile = async () => {
  return axios.get(`/api/profile`);
};

const signOut = async () => {
  return axios.post(`/api/logout`);
};

const exports = {
  getUserProfile,
  signOut
};

export default exports;
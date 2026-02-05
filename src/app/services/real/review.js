import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const searchReviewsByFilter = async (filter) => {
  const { bookId, from, size } = filter;
  const url = `/api/reviews?bookId=${bookId}&from=${from}&size=${size}`;
  return axios.get(url);
};

const getCountsByBookIds = async (bookIds) => {
  return axios.post(`/api/reviews/_counts`, { bookIds });
};

const createReview = async (body) => {
  return axios.post(`/api/reviews`, body);
};

const exports = {
  searchReviewsByFilter,
  getCountsByBookIds,
  createReview
};

export default exports;
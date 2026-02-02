import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getAuthorById = async (id) => {
    return axios.get(`${API_BASE_URL}/api/authors/${id}`);
};

const searchAuthorsByFilter = async (filter) => {
    return axios.post(`${API_BASE_URL}/api/authors/_list`, filter);
};

const createAuthor = async (body) => {
    return axios.post(`${API_BASE_URL}/api/authors`, body);
};

const updateAuthorById = async (id, body) => {
    return axios.put(`${API_BASE_URL}/api/authors/${id}`, body);
};

const deleteAuthorById = async (id) => {
    return axios.get(`${API_BASE_URL}/api/authors/${id}`);
};

const exports = {
    getAuthorById,
    searchAuthorsByFilter,
    createAuthor,
    updateAuthorById,
    deleteAuthorById
};

export default exports;
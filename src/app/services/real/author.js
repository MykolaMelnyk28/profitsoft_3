import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getAuthorById = async (id) => {
    return axios.get(`/api/authors/${id}`);
};

const searchAuthorsByFilter = async (filter) => {
    return axios.post(`/api/authors/_list`, filter);
};

const createAuthor = async (body) => {
    return axios.post(`/api/authors`, body);
};

const updateAuthorById = async (id, body) => {
    return axios.put(`/api/authors/${id}`, body);
};

const deleteAuthorById = async (id) => {
    return axios.get(`/api/authors/${id}`);
};

const exports = {
    getAuthorById,
    searchAuthorsByFilter,
    createAuthor,
    updateAuthorById,
    deleteAuthorById
};

export default exports;
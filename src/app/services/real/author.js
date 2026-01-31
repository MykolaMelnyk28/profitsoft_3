import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getAuthorById = async (id) => {
    return await axios.get(`${API_BASE_URL}/authors/${id}`, { withCredentials: true });
};

const searchAuthorsByFilter = async (filter) => {
    return await axios.post(`${API_BASE_URL}/authors/_list`, filter, { withCredentials: true });
};

const createAuthor = async (body) => {
    return await axios.post(`${API_BASE_URL}/authors`, body, { withCredentials: true });
};

const updateAuthorById = async (id, body) => {
    return await axios.put(`${API_BASE_URL}/authors/${id}`, body, { withCredentials: true });
};

const deleteAuthorById = async (id) => {
    return await axios.get(`${API_BASE_URL}/authors/${id}`, { withCredentials: true });
};

const exports = {
    getAuthorById,
    searchAuthorsByFilter,
    createAuthor,
    updateAuthorById,
    deleteAuthorById
};

export default exports;
import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getBookById = async (id) => {
    return axios.get(`${API_BASE_URL}/api/books/${id}`);
};

const searchBooksByFilter = async (filter) => {
    return axios.post(`${API_BASE_URL}/api/books/_list`, filter);
};

const createBook = async (body) => {
    return axios.post(`${API_BASE_URL}/api/books`, body);
};

const updateBookById = async (id, body) => {
    return axios.put(`${API_BASE_URL}/api/books/${id}`, body);
};

const deleteBookById = async (id) => {
    return axios.delete(`${API_BASE_URL}/api/books/${id}`);
};

const exports = {
    getBookById,
    searchBooksByFilter,
    createBook,
    updateBookById,
    deleteBookById
};

export default exports;
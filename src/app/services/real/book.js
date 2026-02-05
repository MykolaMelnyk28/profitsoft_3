import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getBookById = async (id) => {
    return axios.get(`/api/books/${id}`);
};

const searchBooksByFilter = async (filter) => {
    return axios.post(`/api/books/_list`, filter);
};

const createBook = async (body) => {
    return axios.post(`/api/books`, body);
};

const updateBookById = async (id, body) => {
    return axios.put(`/api/books/${id}`, body);
};

const deleteBookById = async (id) => {
    return axios.delete(`/api/books/${id}`);
};

const exports = {
    getBookById,
    searchBooksByFilter,
    createBook,
    updateBookById,
    deleteBookById
};

export default exports;
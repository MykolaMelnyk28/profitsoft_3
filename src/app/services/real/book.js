import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getBookById = async (id) => {
    return await axios.get(`${API_BASE_URL}/books/${id}`, { withCredentials: true });
};

const searchBooksByFilter = async (filter) => {
    return await axios.post(`${API_BASE_URL}/books/_list`, filter, { withCredentials: true });
};

const createBook = async (body) => {
    return await axios.post(`${API_BASE_URL}/books`, body, { withCredentials: true });
};

const updateBookById = async (id, body) => {
    return await axios.put(`${API_BASE_URL}/books/${id}`, body, { withCredentials: true });
};

const deleteBookById = async (id) => {
    return await axios.delete(`${API_BASE_URL}/books/${id}`, { withCredentials: true });
};

const exports = {
    getBookById,
    searchBooksByFilter,
    createBook,
    updateBookById,
    deleteBookById
};

export default exports;
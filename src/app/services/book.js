import config from 'config';
import axios from 'misc/requests';
import mockBookService from 'misc/data/books/datasourse';

const { BOOKS_SERVICE } = config;

const getBookById = async (id) => {
    try {
        return await axios.get(`${BOOKS_SERVICE}/books/${id}`, { withCredentials: true })
    } catch (err) {
        return mockBookService.getById(id);
    }
};

const searchBooksByFilter = async (filter) => {
    try {
        return await axios.post(`${BOOKS_SERVICE}/books/_list`, filter, { withCredentials: true });
    } catch (err) {
        return mockBookService.search(filter);
    }
};

const createBook = async (body) => {
    try {
        return await axios.post(`${BOOKS_SERVICE}/books`, body, { withCredentials: true });
    } catch (err) {
        return mockBookService.create(body);
    }
};

const updateBookById = async (id, body) => {
    try {
        return await axios.put(`${BOOKS_SERVICE}/books/${id}`, body, { withCredentials: true });
    } catch (err) {
        return mockBookService.updateById(id, body);
    }
};

const deleteBookById = async (id) => {
    try {
        return await axios.delete(`${BOOKS_SERVICE}/books/${id}`, { withCredentials: true });
    } catch (err) {
        return mockBookService.deleteById(id);
    }
};

const exports = {
    getBookById,
    searchBooksByFilter,
    createBook,
    updateBookById,
    deleteBookById
};

export default exports;
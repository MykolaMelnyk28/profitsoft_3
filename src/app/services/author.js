import config from 'config';
import axios from 'misc/requests';
import mockAuthorService from 'misc/data/authors/datasourse';

const { BOOKS_SERVICE } = config;

const getAuthorById = async (id) => {
    try {
        return await axios.get(`${BOOKS_SERVICE}/authors/${id}`, { withCredentials: true });
    } catch (err) {
        return mockAuthorService.getById(id);
    }
};

const searchAuthorsByFilter = async (filter) => {
    try {
        return await axios.post(`${BOOKS_SERVICE}/authors/_list`, filter, { withCredentials: true });
    } catch (err) {
        return mockAuthorService.search(filter);
    }
};

const createAuthor = async (body) => {
    try {
        return await axios.post(`${BOOKS_SERVICE}/authors`, body, { withCredentials: true });
    } catch (err) {
        return mockAuthorService.create(body);
    }
};

const updateAuthorById = async (id, body) => {
    try {
        return await axios.put(`${BOOKS_SERVICE}/authors/${id}`, body, { withCredentials: true });
    } catch (err) {
        return mockAuthorService.updateById(id, body);
    }
};

const deleteAuthorById = async (id) => {
    try {
        return await axios.get(`${BOOKS_SERVICE}/authors/${id}`, { withCredentials: true });
    } catch (err) {
        return mockAuthorService.deleteById(id);
    }
};

const exports = {
    getAuthorById,
    searchAuthorsByFilter,
    createAuthor,
    updateAuthorById,
    deleteAuthorById
};

export default exports;
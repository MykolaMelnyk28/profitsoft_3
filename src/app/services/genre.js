import config from 'config';
import axios from 'misc/requests';
import mockGenreService from 'misc/data/genres/datasourse';

const { BOOKS_SERVICE } = config;

const getGenreById = async (id) => {
    try {
        return await axios.get(`${BOOKS_SERVICE}/genres/${id}`, { withCredentials: true });
    } catch (err) {
        return mockGenreService.getById(id);
    }
};

const searchGenresByFilter = async (filter) => {
    try {
        return await axios.post(`${BOOKS_SERVICE}/genres/_list`, filter, { withCredentials: true });
    } catch (err) {
        return mockGenreService.search(filter);
    }
};

const createGenre = async (body) => {
    try {
        return await axios.post(`${BOOKS_SERVICE}/genres`, body, { withCredentials: true });
    } catch (err) {
        return mockGenreService.create(body);
    }
};

const updateGenreById = async (id, body) => {
    try {
        return await axios.put(`${BOOKS_SERVICE}/genres/${id}`, body, { withCredentials: true });
    } catch (err) {
        return mockGenreService.updateById(id, body);
    }
};

const deleteGenreById = async (id) => {
    try {
        return await axios.get(`${BOOKS_SERVICE}/genres/${id}`, { withCredentials: true });
    } catch (err) {
        return mockGenreService.deleteById(id);
    }
};

const exports = {
    getGenreById,
    searchGenresByFilter,
    createGenre,
    updateGenreById,
    deleteGenreById
};

export default exports;
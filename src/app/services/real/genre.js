import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getGenreById = async (id) => {
    return await axios.get(`/api/genres/${id}`);
};

const searchGenresByFilter = async (filter) => {
    return await axios.post(`/api/genres/_list`, filter);
};

const createGenre = async (body) => {
    return await axios.post(`/api/genres`, body);
};

const updateGenreById = async (id, body) => {
    return await axios.put(`/api/genres/${id}`, body);
};

const deleteGenreById = async (id) => {
    return await axios.get(`/api/genres/${id}`);
};

const exports = {
    getGenreById,
    searchGenresByFilter,
    createGenre,
    updateGenreById,
    deleteGenreById
};

export default exports;
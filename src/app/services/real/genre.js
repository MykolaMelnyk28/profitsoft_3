import config from 'config';
import axios from 'misc/requests';

const { API_BASE_URL } = config;

const getGenreById = async (id) => {
    return await axios.get(`${API_BASE_URL}/genres/${id}`, { withCredentials: true });
};

const searchGenresByFilter = async (filter) => {
    return await axios.post(`${API_BASE_URL}/genres/_list`, filter, { withCredentials: true });
};

const createGenre = async (body) => {
    return await axios.post(`${API_BASE_URL}/genres`, body, { withCredentials: true });
};

const updateGenreById = async (id, body) => {
    return await axios.put(`${API_BASE_URL}/genres/${id}`, body, { withCredentials: true });
};

const deleteGenreById = async (id) => {
    return await axios.get(`${API_BASE_URL}/genres/${id}`, { withCredentials: true });
};

const exports = {
    getGenreById,
    searchGenresByFilter,
    createGenre,
    updateGenreById,
    deleteGenreById
};

export default exports;
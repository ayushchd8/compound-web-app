import axios from 'axios';
import debounce from 'lodash/debounce';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const registerUser = async (userData) => {
    try {
        return await api.post('/register/', userData);
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const loginUser = async (credentials) => {
    try {
        return await api.post('/token/', credentials);
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const createCompound = async (token, compoundData) => {
    try {
        return await api.post('/compounds/', compoundData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const fetchCompounds = async (token) => {
    try {
        return await api.get('/compounds/', {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const updateCompound = async (token, compoundId, compoundData) => {
    try {
        return await api.patch(`/compounds/${compoundId}/update/`, compoundData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const deleteCompound = async (token, compoundId) => {
    try {
        return await api.delete(`/compounds/${compoundId}/delete/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const shareCompound = async (token, compoundId, recipient) => {
    try {
        return await api.post(`/compounds/${compoundId}/share/`, recipient, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const searchCompound = async (token, query) => {
    try {
        return await api.get(`/compounds/search/?q=${query}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const searchUser = async (token, query) => {
    try {
        return await api.get(`/users/search/?q=${query}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const debouncedSearchUser = debounce((token, query, callback) => {
    searchUser(token, query)
        .then(response => callback(response.data))
        .catch(error => console.error("Error searching users:", error));
}, 300);
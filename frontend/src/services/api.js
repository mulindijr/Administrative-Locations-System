import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'API request failed';
    toast.error(message);
    throw error;
};

const api = {
    locations: {
        async getByLevel(level) {
            try {
                const response = await axios.get(`${API_BASE_URL}/level/${level}`);
                return response.data;
            } catch (error) {
                handleError(error);
            }
        },

        async getChildren(id) {
            try {
                const response = await axios.get(`${API_BASE_URL}/${id}/children`);
                return response.data;
            } catch (error) {
                handleError(error);
            }
        },

        async getPath(id) {
            try {
                const response = await axios.get(`${API_BASE_URL}/${id}/path`);
                return response.data;
            } catch (error) {
                handleError(error);
            }
        },

        async getSingle(id) {
            try {
                const response = await axios.get(`${API_BASE_URL}/${id}`);
                return response.data;
            } catch (error) {
                handleError(error);
            }
        },

        async create(data) {
            try {
                const response = await axios.post(API_BASE_URL, data);
                toast.success('Location created successfully');
                return response.data;
            } catch (error) {
                handleError(error);
            }
        },

        async update(id, data) {
            try {
                const response = await axios.put(`${API_BASE_URL}/${id}`, data);
                toast.success('Location updated successfully');
                return response.data;
            } catch (error) {
                handleError(error);
            }
        },

        async delete(id) {
            try {
                await axios.delete(`${API_BASE_URL}/${id}`);
                toast.success('Location deleted successfully');
                return true;
            } catch (error) {
                handleError(error);
            }
        },

        async search(query) {
            try {
                const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
                return response.data;
            } catch (error) {
                handleError(error);
            }
        },

        async getStats() {
            try {
                const response = await axios.get(`${API_BASE_URL}/stats`);
                return response.data;
            } catch (error) {
                handleError(error);
            }
        }        
    }
};

export default api;
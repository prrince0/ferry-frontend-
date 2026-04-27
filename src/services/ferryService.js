import api from './api';

export const getFerries = async () => {
    const response = await api.get('/ferries');
    return response.data.ferries || response.data;
};
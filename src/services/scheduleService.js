import api from './api';

// Get all schedules
export const getSchedules = async () => {
    const response = await api.get('/schedules');
    return response.data;
};

// Get schedules for a specific ferry
export const getSchedulesByFerry = async (ferryId) => {
    const response = await api.get(`/schedules?ferry_id=${ferryId}`);
    return response.data;
};

// Get schedules for a specific route
export const getSchedulesByRoute = async (routeId) => {
    const response = await api.get(`/schedules?route_id=${routeId}`);
    return response.data;
};

// Get schedules for a specific date
export const getSchedulesByDate = async (date) => {
    const response = await api.get(`/schedules?date=${date}`);
    return response.data;
}; 
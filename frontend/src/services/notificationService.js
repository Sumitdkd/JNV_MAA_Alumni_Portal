import api from './api';

const getNotifications = () => api.get('/notifications');
const markAsRead = () => api.put('/notifications/mark-read');
const markOneAsRead = (id) => api.put(`/notifications/${id}/mark-read`);

const notificationService = {
    getNotifications,
    markAsRead,
    markOneAsRead,
};
export default notificationService;
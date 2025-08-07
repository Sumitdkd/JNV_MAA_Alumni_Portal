import api from './api';
const getAlumniDirectory = (params) => api.get('/users', { params });
const getUserProfile = () => api.get('/auth/me');
const updateProfile = (profileData) => api.put('/users/profile', profileData);
const updateProfilePicture = (formData) => api.put('/users/profile/picture', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
const getPendingUsers = () => api.get('/users/pending');
const approveUser = (id) => api.put(`/users/approve/${id}`);
const deleteUser = (id) => api.delete(`/users/${id}`);
const getTodaysBirthdays = () => api.get('/users/birthdays/today');
const searchUsers = (query) => api.get(`/users/search?q=${query}`);

const userService = {
    getAlumniDirectory, getUserProfile, updateProfile, updateProfilePicture,
    getPendingUsers, approveUser, deleteUser, getTodaysBirthdays, searchUsers
};
export default userService;


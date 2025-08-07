import api from './api';

const register = (userData) => {
    console.log("UserData:", userData);
    return api.post('/auth/register', userData);
};

const login = (credentials) => {
    return api.post('/auth/login', credentials);
};

const getMe = () => {
    return api.get('/auth/me');
};
const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
const resetPassword = (token, password) => api.put(`/auth/reset-password/${token}`, { password });

const authService = {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword
};

export default authService;

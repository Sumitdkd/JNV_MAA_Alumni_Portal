import api from './api';
const getMessages = (groupId) => api.get(`/messages/${groupId}`);

const messageService = { getMessages};
export default messageService;

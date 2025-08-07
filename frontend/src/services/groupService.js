import api from './api';
const getGroups = () => api.get('/groups');
const createGroup = (groupData) => api.post('/groups', groupData);
const joinGroup = (groupId) => api.put(`/groups/${groupId}/join`);
const getGroupDetails = (groupId) => api.get(`/groups/${groupId}`);
const isGroupMember = (groupId) => api.get(`/groups/${groupId}/isGroupMember`);
const leaveGroup = (groupId) => api.put(`/groups/${groupId}/leave`);

const groupService = { getGroups, createGroup, joinGroup, getGroupDetails, isGroupMember,leaveGroup };
export default groupService;

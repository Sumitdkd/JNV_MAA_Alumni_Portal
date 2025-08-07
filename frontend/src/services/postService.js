import api from './api';

const getPosts = (page = 1, limit = 10) => {
    return api.get(`/posts?page=${page}&limit=${limit}`);
};

const createPost = (postData) => {
    return api.post('/posts', postData);
};

const updatePost = (id, postData) => {
    return api.put(`/posts/${id}`, postData);
};

const getPostById = (postId) => api.get(`/posts/${postId}`);

const likePost = (postId) => api.put(`/posts/${postId}/like`);

const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};

const addComment = (postId, commentData) => api.post(`/posts/${postId}/comment`, commentData);

const postService = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    addComment,
    getPostById,
    likePost
};

export default postService;


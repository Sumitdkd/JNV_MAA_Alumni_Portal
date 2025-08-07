import api from './api';

const submitFeedback = (feedbackData) => {
    return api.post('/feedback', feedbackData);
};

const getFeedbacks = () => {
    return api.get('/feedback');
};

const feedbackService = {
    submitFeedback,
    getFeedbacks,
};

export default feedbackService;
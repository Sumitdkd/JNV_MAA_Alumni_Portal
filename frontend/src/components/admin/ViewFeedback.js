import React, { useState, useEffect } from 'react';
import feedbackService from '../../services/feedbackService';
import toast from 'react-hot-toast';
import Spinner from '../common/Spinner';

export default function ViewFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await feedbackService.getFeedbacks();
                setFeedbacks(res.data.data);
            } catch (error) {
                toast.error("Failed to fetch feedback.");
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {feedbacks.length > 0 ? feedbacks.map((feedback) => (
                    <li key={feedback._id}>
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-brand-blue truncate">{feedback.subject}</p>
                                <p className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">{feedback.message}</p>
                                <p className="text-sm text-gray-500 mt-2">From: {feedback.user.fullName} ({feedback.user.email})</p>
                            </div>
                        </div>
                    </li>
                )) : <p className="p-4 text-gray-500">No feedback submitted yet.</p>}
            </ul>
        </div>
    );
}


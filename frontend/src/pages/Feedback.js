import React, { useState } from 'react';
import feedbackService from '../services/feedbackService';
import toast from 'react-hot-toast';

export default function Feedback() {
    const [formData, setFormData] = useState({ subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await feedbackService.submitFeedback(formData);
            toast.success("Feedback submitted successfully. Thank you!");
            setFormData({ subject: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit feedback.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-surface shadow-lg rounded-xl p-8">
                <h1 className="text-2xl font-bold text-on-surface mb-4">Submit Feedback</h1>
                <p className="text-muted mb-6">We would love to hear your thoughts, suggestions, or concerns.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <textarea name="message" placeholder="Your message" value={formData.message} onChange={handleChange} required rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors disabled:bg-primary-light">
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import authService from '../../services/authService';
import toast from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ForgotPasswordModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authService.forgotPassword(email);
            toast.success(res.data.message);
            setSubmitted(true);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-xl shadow-2xl p-8 w-full max-w-md animate-zoomIn" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-on-surface p-1 rounded-full hover:bg-gray-100">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-on-surface">Reset Password</h2>
                {submitted ? (
                    <p className="text-muted">If an account with that email exists, a password reset link has been sent. Please check your inbox (and spam folder!).</p>
                ) : (
                    <>
                        <p className="text-muted mb-6">Enter your email address and we'll send you a link to reset your password.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors disabled:bg-primary-light">
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

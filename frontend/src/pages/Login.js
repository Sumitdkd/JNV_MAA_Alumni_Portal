import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import authService from '../services/authService';
import toast from 'react-hot-toast';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isForgotModalOpen, setForgotModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authService.login(formData);
            login(res.data.token);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4">
                <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-8 lg:p-10 bg-surface rounded-xl shadow-lg">
                    {/* ... Login form header ... */}
                    <div>
                        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-on-surface">Sign in to your account</h2>
                        <p className="mt-2 text-center text-sm text-muted">Or{' '}<Link to="/register" className="font-medium text-primary hover:text-primary-dark">register for a new account</Link></p>
                    </div>
                    <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                        {/* ... email and password inputs ... */}
                        <input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base" />
                        <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base" />
                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <button type="button" onClick={() => setForgotModalOpen(true)} className="font-medium text-primary hover:text-primary-dark">
                                    Forgot your password?
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2.5 sm:py-3 px-4 rounded-md text-white text-sm font-medium transition duration-150 ease-in-out
      ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'}`}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            {isForgotModalOpen && <ForgotPasswordModal onClose={() => setForgotModalOpen(false)} />}
        </>
    );
}
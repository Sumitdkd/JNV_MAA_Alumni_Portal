import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import toast from 'react-hot-toast';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const errors = [];
        
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        
        if (!/(?=.*\d)/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        return errors;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        
        // Clear errors when user starts typing
        if (errors.password) {
            setErrors({ ...errors, password: '' });
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        
        // Clear errors when user starts typing
        if (errors.confirmPassword) {
            setErrors({ ...errors, confirmPassword: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate passwords
        const passwordErrors = validatePassword(password);
        const newErrors = {};
        
        if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors.join(', ');
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setLoading(true);
        setErrors({});
        
        try {
            const res = await authService.resetPassword(token, password);
            toast.success(res.data.message);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred.";
            toast.error(errorMessage);
            
            // Handle validation errors from backend
            if (err.response?.data?.errors) {
                const backendErrors = {};
                err.response.data.errors.forEach(error => {
                    backendErrors[error.field] = error.message;
                });
                setErrors(backendErrors);
            }
        } finally {
            setLoading(false);
        }
    };

    const getInputClassName = (fieldName) => {
        const baseClasses = "w-full px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary";
        return `${baseClasses} ${errors[fieldName] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`;
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-surface rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-on-surface">Reset Your Password</h2>
                    <p className="mt-2 text-center text-sm text-muted">
                        Enter your new password below
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="New Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                            className={getInputClassName('password')}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    
                    <div>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            required
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={getInputClassName('confirmPassword')}
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </button>
                    
                    <div className="text-center">
                        <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

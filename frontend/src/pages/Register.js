import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import toast from 'react-hot-toast';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        batchYear: '',
        admissionNumber: '',
        dateOfBirth: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            newErrors.fullName = 'Full name can only contain letters and spaces';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
        }

        // Batch year validation
        if (!formData.batchYear) {
            newErrors.batchYear = 'Batch year is required';
        } else {
            const year = parseInt(formData.batchYear);
            const currentYear = new Date().getFullYear();
            if (year < 1950 || year > currentYear) {
                newErrors.batchYear = `Batch year must be between 1950 and ${currentYear}`;
            }
        }

        // Date of birth validation
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else {
            const dob = new Date(formData.dateOfBirth);
            const today = new Date();
            const minDate = new Date('1900-01-01');
            
            if (dob > today) {
                newErrors.dateOfBirth = 'Date of birth cannot be in the future';
            } else if (dob < minDate) {
                newErrors.dateOfBirth = 'Date of birth must be after 1900';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await authService.register(formData);
            toast.success('Registration successful! Please wait for admin approval.');
            navigate('/login');
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed.';
            
            // Handle validation errors from backend
            if (error.response?.data?.errors) {
                const backendErrors = {};
                error.response.data.errors.forEach(err => {
                    backendErrors[err.field] = err.message;
                });
                setErrors(backendErrors);
                toast.error('Please fix the validation errors below.');
            } else {
                toast.error(message);
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
        <div className="flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4 lg:px-8">
            <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-8 lg:p-10 bg-surface rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-on-surface">Create Your Alumni Account</h2>
                    <p className="mt-2 text-center text-sm text-muted">
                        Already a member?{' '}
                        <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input 
                            name="fullName" 
                            placeholder="Full Name" 
                            required 
                            onChange={handleChange}
                            className={getInputClassName('fullName')}
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>
                    
                    <div>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Email Address" 
                            required 
                            onChange={handleChange}
                            className={getInputClassName('email')}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)" 
                            required 
                            onChange={handleChange}
                            className={getInputClassName('password')}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    
                    <div>
                        <input 
                            name="batchYear" 
                            type="number" 
                            placeholder="Batch Year (e.g., 2015)" 
                            required 
                            onChange={handleChange}
                            className={getInputClassName('batchYear')}
                        />
                        {errors.batchYear && <p className="mt-1 text-sm text-red-600">{errors.batchYear}</p>}
                    </div>
                    
                    <div>
                        <input 
                            name="admissionNumber" 
                            type="text" 
                            placeholder="Admission Number (optional)" 
                            onChange={handleChange}
                            className={getInputClassName('admissionNumber')}
                        />
                        {errors.admissionNumber && <p className="mt-1 text-sm text-red-600">{errors.admissionNumber}</p>}
                    </div>
                    
                    <div>
                        <input 
                            name="dateOfBirth" 
                            type="date" 
                            required 
                            onChange={handleChange}
                            className={getInputClassName('dateOfBirth')}
                        />
                        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2.5 sm:py-3 px-4 rounded-md text-white text-sm font-medium transition duration-150 ease-in-out ${
                                loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'
                            }`}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Auth.css';

const SignUp = () => {
    const navigate = useNavigate();
    const { user, login } = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // In a real app this would POST to an API.
        // For now we persist the local context user object with the new credentials.
        login({
            name: formData.name,
            email: formData.email,
            // Retain the onboarding data (interests, year, dept)
            interests: user.interests,
            year: user.year,
            department: user.department
        });

        // Requirements say redirect to login page after signup
        alert("Signup successful! Please log in.");
        navigate('/login');
    };

    const handleGoogleAuth = () => {
        alert("Google Auth would open here.");
        navigate('/login');
    };

    return (
        <div className="page-wrapper auth-page">
            <div className="auth-header">
                <h2>Create an Account</h2>
                <p className="subtitle">Join EventMate to explore your campus</p>
            </div>

            <form onSubmit={handleSubmit} className="glass-panel auth-form">
                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        className="glass-input"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        className="glass-input"
                        placeholder="College Email ID"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        className="glass-input"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        className="glass-input"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                </button>

                <div className="divider">
                    <span>or</span>
                </div>

                <button type="button" onClick={handleGoogleAuth} className="btn btn-secondary btn-block g-auth">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="link-text">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

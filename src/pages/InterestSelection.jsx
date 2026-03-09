import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './InterestSelection.css';

const INTERESTS = ['Tech', 'Cultural', 'Sports', 'Workshops', 'Hackathons', 'Clubs'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const DEPARTMENTS = ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];

const InterestSelection = () => {
    const navigate = useNavigate();
    const { updateProfile } = useContext(AppContext);

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleGetStarted = (e) => {
        e.preventDefault();
        if (selectedInterests.length === 0 || !year || !department) {
            alert('Please fill out all fields to continue.');
            return;
        }

        // Save initial data to state
        updateProfile({
            interests: selectedInterests,
            year,
            department
        });

        navigate('/signup');
    };

    return (
        <div className="page-wrapper interest-page">
            <div className="onboarding-header">
                <h1>Event<span className="gradient-text">Mate</span></h1>
                <p className="subtitle">Discover events made for you</p>
            </div>

            <form onSubmit={handleGetStarted} className="glass-panel onboarding-form">
                <div className="form-section">
                    <h3>Select Your Interests</h3>
                    <p className="section-hint">Choose one or more to personalize your feed</p>

                    <div className="checkbox-grid">
                        {INTERESTS.map(interest => (
                            <label
                                key={interest}
                                className={`interest-checkbox ${selectedInterests.includes(interest) ? 'active' : ''}`}
                            >
                                <input
                                    type="checkbox"
                                    value={interest}
                                    checked={selectedInterests.includes(interest)}
                                    onChange={() => toggleInterest(interest)}
                                    className="hidden-checkbox"
                                />
                                <span>{interest}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Academic Details</h3>

                    <div className="select-wrapper">
                        <select
                            className="glass-input custom-select"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Select Year</option>
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    <div className="select-wrapper">
                        <select
                            className="glass-input custom-select"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Select Department</option>
                            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block get-started-btn">
                    Get Started
                </button>
            </form>
        </div>
    );
};

export default InterestSelection;

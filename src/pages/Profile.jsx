import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LogOut, Edit2, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user, events, registeredEvents, logout, updateProfile } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: user.name,
        year: user.year,
        department: user.department
    });

    // Map registered IDs to actual event objects
    const registeredEventItems = events.filter(e => registeredEvents.includes(e.id));

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSaveProfile = () => {
        updateProfile(editData);
        setIsEditing(false);
    };

    const navToEvent = (id) => {
        navigate(`/event/${id}`);
    };

    return (
        <div className="page-wrapper profile-page">
            <div className="profile-header">
                <h2>Profile</h2>
                <button className="icon-btn logout-btn" onClick={handleLogout}>
                    <LogOut size={20} />
                </button>
            </div>

            <div className="profile-card glass-panel">
                <div className="profile-avatar-large">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>

                {isEditing ? (
                    <div className="profile-edit-form">
                        <input
                            type="text"
                            className="glass-input mb-2"
                            value={editData.name}
                            onChange={e => setEditData({ ...editData, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="glass-input mb-2"
                            value={editData.year}
                            onChange={e => setEditData({ ...editData, year: e.target.value })}
                        />
                        <input
                            type="text"
                            className="glass-input mb-2"
                            value={editData.department}
                            onChange={e => setEditData({ ...editData, department: e.target.value })}
                        />
                        <div className="edit-actions">
                            <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button className="btn btn-primary btn-sm" onClick={handleSaveProfile}>Save</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="profile-info">
                            <h3>{user.name}</h3>
                            <p className="profile-email">{user.email}</p>

                            <div className="profile-meta">
                                <span className="meta-badge">{user.year}</span>
                                <span className="meta-badge">{user.department}</span>
                            </div>

                            <div className="profile-interests">
                                <h4>Interests</h4>
                                <div className="interest-tags">
                                    {user.interests.map(i => (
                                        <span key={i} className="tag">{i}</span>
                                    ))}
                                    {user.interests.length === 0 && <span className="tag empty">None selected</span>}
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-secondary btn-block edit-btn" onClick={() => setIsEditing(true)}>
                            <Edit2 size={16} /> Edit Profile
                        </button>
                    </>
                )}
            </div>

            <div className="registered-section">
                <h3>Registered Events ({registeredEventItems.length})</h3>
                <div className="registered-list">
                    {registeredEventItems.map(event => (
                        <div key={event.id} className="registered-item glass-panel" onClick={() => navToEvent(event.id)}>
                            <div className="reg-image">
                                <img src={event.image} alt={event.title} />
                            </div>
                            <div className="reg-content">
                                <h4>{event.title}</h4>
                                <p>{event.date}</p>
                            </div>
                            <ChevronRight className="reg-arrow" size={20} />
                        </div>
                    ))}
                    {registeredEventItems.length === 0 && (
                        <p className="empty-state-sm">You haven't registered for any events yet.</p>
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Profile;

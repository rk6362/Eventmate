import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import EventCard from '../components/EventCard';
import BottomNav from '../components/BottomNav';
import './Home.css';

const Home = () => {
    const { user, events } = useContext(AppContext);

    // Filter Recommended Events based on User Interests
    const recommendedEvents = useMemo(() => {
        if (!user.interests || user.interests.length === 0) {
            return events.slice(0, 5); // Fallback to first 5 if no interests
        }
        const filtered = events.filter(e => user.interests.includes(e.category));
        return filtered.length > 0 ? filtered : events.slice(0, 5);
    }, [events, user.interests]);

    return (
        <div className="page-wrapper home-page">
            <header className="dashboard-header">
                <div className="user-greeting">
                    <p className="greeting-text">Welcome back,</p>
                    <h1>Hi, {user.name || 'Student'} 👋</h1>
                </div>
                <div className="user-avatar glass-panel">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
            </header>

            <section className="recommended-section">
                <div className="section-title-wrap">
                    <h2>Recommended for You</h2>
                    <span className="badge">{user.interests.slice(0, 2).join(', ')}{user.interests.length > 2 && '...'}</span>
                </div>

                <div className="events-list">
                    {recommendedEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                    {recommendedEvents.length === 0 && (
                        <p className="empty-state">No events found matching your interests.</p>
                    )}
                </div>
            </section>

            <BottomNav />
        </div>
    );
};

export default Home;

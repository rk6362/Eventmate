import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import EventCard from '../components/EventCard';
import BottomNav from '../components/BottomNav';
import { Heart } from 'lucide-react';
import './Saved.css';

const Saved = () => {
    const { events, savedEvents } = useContext(AppContext);

    // Map saved IDs to actual event objects
    const savedEventItems = events.filter(e => savedEvents.includes(e.id));

    return (
        <div className="page-wrapper saved-page">
            <div className="saved-header">
                <h2>Saved Events</h2>
                <p className="subtitle">Your personalized shortlist</p>
            </div>

            <div className="saved-content">
                {savedEventItems.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}

                {savedEventItems.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon-wrapper glass-panel">
                            <Heart size={48} color="var(--text-secondary)" />
                        </div>
                        <h3>No Saved Events</h3>
                        <p>Tap the heart icon on any event to save it here for later.</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
};

export default Saved;
